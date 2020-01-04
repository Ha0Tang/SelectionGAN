-- usage: DATA_ROOT=/path/to/data/ name=expt1 which_direction=BtoA th test.lua
--
-- code derived from https://github.com/soumith/dcgan.torch
--

require 'image'
require 'nn'
require 'nngraph'
util = paths.dofile('util/util.lua')
torch.setdefaulttensortype('torch.FloatTensor')

opt = {
    DATA_ROOT = '/home/user/Documents/CVPR2018/XFork/datasets/AB_AsBs',           -- path to images (should have subfolders 'train', 'val', etc)
    batchSize = 10,            -- # images in batch
    loadSize = 256,           -- scale images to this size
    fineSize = 256,           --  then crop to this size
    flip=0,                   -- horizontal mirroring data augmentation
    display = 0,              -- display samples while training. 0 = false
    display_id = 200,         -- display window id.
    gpu = 1,                  -- gpu = 0 is CPU mode. gpu=X is GPU mode on GPU X
    how_many = 'all',         -- how many test images to run (set to all to run on every image found in the data/phase folder)
    which_direction = 'a2g', -- g2a or a2g
    phase = 'sample',            -- train, val, test ,etc
    preprocess = 'regular',   -- for special purpose preprocessing, e.g., for colorization, change this (selects preprocessing functions in util.lua)
    aspect_ratio = 1.0,       -- aspect ratio of result images
    name = 'a2g_fork',                -- name of experiment, selects which model to run, should generally should be passed on command line
    input_nc = 3,             -- #  of input image channels for img
    output_nc_seg = 3,             -- #  of input image channels for seg
    output_nc = 3,            -- #  of output image channels
    serial_batches = 1,       -- if 1, takes images in order to make batches, otherwise takes them randomly
    serial_batch_iter = 1,    -- iter into serial image list
    cudnn = 1,                -- set to 0 to not use cudnn (untested)
    checkpoints_dir = './checkpoints', -- loads models from here
    results_dir='./results/',          -- saves results here
    which_epoch = '35',            -- which epoch to test? set to 'latest' to use latest cached model
}


-- one-line argument parser. parses enviroment variables to override the defaults
for k,v in pairs(opt) do opt[k] = tonumber(os.getenv(k)) or os.getenv(k) or opt[k] end
opt.nThreads = 1 -- test only works with 1 thread...
print(opt)

if opt.display == 0 then opt.display = false end

opt.manualSeed = torch.random(1, 10000) -- set seed
print("Random Seed: " .. opt.manualSeed)
torch.manualSeed(opt.manualSeed)
torch.setdefaulttensortype('torch.FloatTensor')

opt.netG_name = opt.name .. '/' .. opt.which_epoch .. '_net_G'

local data_loader = paths.dofile('data/data.lua')
print('#threads...' .. opt.nThreads)
local data = data_loader.new(opt.nThreads, opt)
print("Dataset Size: ", data:size())

-- translation direction
local input_nc = opt.input_nc
local output_nc_seg = opt.output_nc_seg
local output_nc = opt.output_nc

-- translation direction
local idx_A = nil
local idx_B = nil
local idx_As = nil
local idx_Bs = nil

if opt.which_direction=='g2a' then
    idx_A = {1, input_nc}
    idx_B = {input_nc + 1, input_nc + output_nc}
    idx_As = {input_nc + output_nc + 1, input_nc + output_nc + output_nc_seg}
    idx_Bs = {input_nc + output_nc + output_nc_seg + 1, 2 * output_nc + input_nc + output_nc_seg}
    
elseif opt.which_direction=='a2g' then
    idx_A = {input_nc + 1, input_nc + output_nc}
    idx_B = {1, input_nc}
    idx_As = {input_nc + output_nc + output_nc_seg + 1, 2 * output_nc + input_nc + output_nc_seg}
    idx_Bs = {input_nc + output_nc + 1, input_nc + output_nc + output_nc_seg}  
    
else
    error(string.format('bad direction %s',opt.which_direction))
end

----------------------------------------------------------------------------

local input = torch.FloatTensor(opt.batchSize,input_nc,opt.fineSize,opt.fineSize)
local Bs = torch.FloatTensor(opt.batchSize,input_nc,opt.fineSize,opt.fineSize)
local output_img = torch.FloatTensor(opt.batchSize,output_nc,opt.fineSize,opt.fineSize)
local output_seg = torch.FloatTensor(opt.batchSize,output_nc_seg,opt.fineSize,opt.fineSize)
local target = torch.FloatTensor(opt.batchSize,output_nc,opt.fineSize,opt.fineSize)
local output = {output_img, output_seg}
print('checkpoints_dir', opt.checkpoints_dir)
local netG = util.load(paths.concat(opt.checkpoints_dir, opt.netG_name .. '.t7'), opt)

print(netG)


function TableConcat(t1,t2)
    for i=1,#t2 do
        t1[#t1+1] = t2[i]
    end
    return t1
end

if opt.how_many=='all' then
    opt.how_many=data:size()
end
opt.how_many=math.min(opt.how_many, data:size())

local filepaths = {} -- paths to images tested on
for n=1,math.floor(opt.how_many/opt.batchSize) do
    print('processing batch ' .. n)
    
    local data_curr, filepaths_curr = data:getBatch()
    filepaths_curr = util.basename_batch(filepaths_curr)
    print('filepaths_curr: ', filepaths_curr)
    
    input = data_curr[{ {}, idx_A, {}, {} }]
    target = data_curr[{ {}, idx_B, {}, {} }]
    Bs = data_curr[{ {}, idx_Bs, {}, {} }]
    input_Bs = torch.cat(input,Bs,2)
    
    -- if opt.gpu > 0 then
    --     input = input:cuda()
    -- end
    if opt.gpu > 0 then
        input_Bs = input_Bs:cuda()
    end
    
    -- output = netG:forward(input)
    output = netG:forward(input_Bs)
    print('Both image and segmentaion as input.')
    output_img = util.deprocess_batch(output[1])
    output_seg = util.deprocess_batch(output[2])

    input = util.deprocess_batch(input):float()
    output_img = output_img:float()
    output_seg = output_seg:float()
    target = util.deprocess_batch(target):float()

    paths.mkdir(paths.concat(opt.results_dir, opt.netG_name .. '_' .. opt.phase))
    local image_dir = paths.concat(opt.results_dir, opt.netG_name .. '_' .. opt.phase, 'images')
    paths.mkdir(image_dir)
    paths.mkdir(paths.concat(image_dir,'input'))
    paths.mkdir(paths.concat(image_dir,'output'))
    paths.mkdir(paths.concat(image_dir,'seg_output'))
    paths.mkdir(paths.concat(image_dir,'target'))
    -- print(input:size())
    -- print(output:size())
    -- print(target:size())
    for i=1, opt.batchSize do
        image.save(paths.concat(image_dir,'input',filepaths_curr[i]), image.scale(input[i],input[i]:size(2),input[i]:size(3)/opt.aspect_ratio))
        image.save(paths.concat(image_dir,'output',filepaths_curr[i]), image.scale(output_img[i],output_img[i]:size(2),output_img[i]:size(3)/opt.aspect_ratio))
        image.save(paths.concat(image_dir,'target',filepaths_curr[i]), image.scale(target[i],target[i]:size(2),target[i]:size(3)/opt.aspect_ratio))        
        image.save(paths.concat(image_dir,'seg_output',filepaths_curr[i]), image.scale(output_seg[i],output_seg[i]:size(2),output_seg[i]:size(3)/opt.aspect_ratio))
    end
    print('Saved images to: ', image_dir)
    
    if opt.display then
      if opt.preprocess == 'regular' then
        disp = require 'display'
        disp.image(util.scaleBatch(input,100,100),{win=opt.display_id, title='input'})
        disp.image(util.scaleBatch(output_img,100,100),{win=opt.display_id+1, title='output'})
        disp.image(util.scaleBatch(target,100,100),{win=opt.display_id+2, title='target'})
        disp.image(util.scaleBatch(output_seg,100,100),{win=opt.display_id+3, title='seg output'})
        
        print('Displayed images')
      end
    end
    
    filepaths = TableConcat(filepaths, filepaths_curr)
end

-- make webpage
io.output(paths.concat(opt.results_dir,opt.netG_name .. '_' .. opt.phase, 'index.html'))

io.write('<table style="text-align:center;">')

io.write('<tr><td>Image #</td><td>Input</td><td>Output</td><td>Seg Output</td><td>Ground Truth</td></tr>')
for i=1, #filepaths do
    io.write('<tr>')
    io.write('<td>' .. filepaths[i] .. '</td>')
    io.write('<td><img src="./images/input/' .. filepaths[i] .. '"/></td>')
    io.write('<td><img src="./images/output/' .. filepaths[i] .. '"/></td>')
    io.write('<td><img src="./images/seg_output/' .. filepaths[i] .. '"/></td>')
    io.write('<td><img src="./images/target/' .. filepaths[i] .. '"/></td>')
    io.write('</tr>')
end

io.write('</table>')
