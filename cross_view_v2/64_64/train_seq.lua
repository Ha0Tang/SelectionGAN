-- usage example: DATA_ROOT=/path/to/data/ which_direction=a2g name=expt1 th train.lua 
--
-- code derived from https://github.com/soumith/dcgan.torch
-- code derived from https://github.com/phillipi/pix2pix/


require 'torch'
require 'nn'
require 'optim'
util = paths.dofile('util/util.lua')
require 'image'
require 'models'

opt = {
   DATA_ROOT = '',         -- path to images (should have subfolders 'train', 'val', etc)
   batchSize = 4,          -- # images in batch
   loadSize = 286,         -- scale images to this size
   fineSize = 256,         --  then crop to this size
   ngf = 64,               -- #  of gen filters in first conv layer
   ndf = 64,               -- #  of discrim filters in first conv layer
   input_nc = 3,           -- #  of input image channels
   input_nc_seg =3, 
   output_nc = 3,          -- #  of output image channels
   niter = 35,            -- #  of iter at starting learning rate  -- was 200
   lr = 0.0002,            -- initial learning rate for adam
   beta1 = 0.5,            -- momentum term of adam
   ntrain = math.huge,     -- #  of examples per epoch. math.huge for full dataset
   flip = 1,               -- if flip the images for data argumentation
   display = 0,            -- display samples while training. 0 = false
   display_id = 10,        -- display window id.
   gpu = 1,                -- gpu = 0 is CPU mode. gpu=X is GPU mode on GPU X, gpu = 1 used generally
   name = 'a2g_seq',              -- name of the experiment, should generally be passed on the command line
   which_direction = 'a2g',    -- g2a or a2g
   phase = 'train',             -- train, val, test, etc
   preprocess = 'regular',      -- for special purpose preprocessing, e.g., for colorization, change this (selects preprocessing functions in util.lua)
   nThreads = 4 ,                -- # threads for loading data
   save_epoch_freq = 5,        -- save a model every save_epoch_freq epochs (does not overwrite previously saved models)
   save_latest_freq = 13750,     -- save the latest model every latest_freq sgd iterations (overwrites the previous latest model)
   print_freq = 10,             -- print the debug information every print_freq iterations
   display_freq = 100,          -- display the current results every display_freq iterations
   save_display_freq = 5000,    -- save the current display of results every save_display_freq_iterations
   continue_train=0,            -- if continue training, load the latest model: 1: true, 0: false
   serial_batches = 0,          -- if 1, takes images in order to make batches, otherwise takes them randomly
   serial_batch_iter = 1,       -- iter into serial image list
   checkpoints_dir = './checkpoints', -- models are saved here
   cudnn = 1,                         -- set to 0 to not use cudnn
   condition_GAN = 1,                 -- set to 0 to use unconditional discriminator
   use_GAN = 1,                       -- set to 0 to turn off GAN term
   use_L1 = 1,                        -- set to 0 to turn off L1 term
   which_model_netD = 'basic', -- selects model to use for netD, eg 	crossview_D_64
   which_model_netG = 'encoder_decoder',  -- selects model to use for netG 	crossview_G_64
   n_layers_D = 0,             -- only used if which_model_netD=='n_layers'
   lambda = 100,               -- weight on L1 term in objective
   lambda_grads = 0.1,               -- weight on L1 term in objective
   which_epoch = '0',            -- epoch number to resume training, used only if continue_train=1
}
-- one-line argument parser. parses enviroment variables to override the defaults
for k,v in pairs(opt) do opt[k] = tonumber(os.getenv(k)) or os.getenv(k) or opt[k] end
print(opt)


local input_nc = opt.input_nc
local input_nc_seg = opt.input_nc_seg
local output_nc = opt.output_nc

-- translation direction
local idx_A = nil
local idx_B = nil
local idx_As = nil
local idx_Bs = nil

if opt.which_direction=='g2a' then
    idx_A = {1, input_nc}
    idx_B = {input_nc+1, input_nc+output_nc}
    idx_As = {input_nc+output_nc+1, 2*input_nc+output_nc}
    idx_Bs = {2*input_nc+output_nc+1, 2*(input_nc+output_nc)}
elseif opt.which_direction=='a2g' then
    idx_A = {input_nc+1, input_nc+output_nc}
    idx_B = {1, input_nc}
    idx_As = {2*input_nc+output_nc+1, 2*(input_nc+output_nc)}
    idx_Bs = {input_nc+output_nc+1, 2*input_nc+output_nc}    
else
    error(string.format('bad direction %s',opt.which_direction))
end

if opt.display == 0 then opt.display = false end

opt.manualSeed = torch.random(1, 10000) -- fix seed
print("Random Seed: " .. opt.manualSeed)
torch.manualSeed(opt.manualSeed)
torch.setdefaulttensortype('torch.FloatTensor')

-- create data loader
local data_loader = paths.dofile('data/data.lua')
print('#threads...' .. opt.nThreads)
local data = data_loader.new(opt.nThreads, opt)
print("Dataset Size: ", data:size())
tmp_d, tmp_paths = data:getBatch()

----------------------------------------------------------------------------
local function weights_init(m)
   local name = torch.type(m)
   if name:find('Convolution') then
      m.weight:normal(0.0, 0.02)
      m.bias:fill(0)
   elseif name:find('BatchNormalization') then
      if m.weight then m.weight:normal(1.0, 0.02) end
      if m.bias then m.bias:fill(0) end
   end
end


local ndf = opt.ndf
local ngf = opt.ngf
local real_label = 0.9
local fake_label = 0

function defineG_seg(input_nc, output_nc, ngf)
    local netG=nil
    netG = defineG_encoder_decoder(input_nc, output_nc, ngf)
    netG:apply(weights_init)
    return netG
end

function defineG(input_nc, output_nc, ngf)
    local netG = nil
    if     opt.which_model_netG == "encoder_decoder" then netG = defineG_encoder_decoder(input_nc, output_nc, ngf)
    elseif  opt.which_model_netG == "crossview_G_64" then netG = my_generator_crossview_64_64(input_nc, output_nc, ngf)
    elseif  opt.which_model_netG == "mynetG_64_64" then netG = my_generator_fusion_64_64(input_nc, input_nc_seg, output_nc, ngf)
    elseif opt.which_model_netG == "unet" then netG = defineG_unet(input_nc, output_nc, ngf)
    else error("unsupported netG model")
    end
   
    netG:apply(weights_init)
  
    return netG
end

function defineD(input_nc, output_nc, ndf)
    local netD = nil
    if opt.condition_GAN==1 then
        input_nc_tmp = input_nc
    else
        input_nc_tmp = 0 -- only penalizes structure in output channels
    end
    
    if     opt.which_model_netD == "basic" then netD = defineD_basic(input_nc_tmp, output_nc, ndf)
    elseif  opt.which_model_netD == "crossview_D_64" then netD = my_D_crossview_64_64(input_nc_tmp, output_nc, ndf)
    elseif  opt.which_model_netD == "basic_D_64" then netD = defineD_3channel_64(input_nc_tmp, output_nc, ndf)
    elseif opt.which_model_netD == "n_layers" then netD = defineD_n_layers(input_nc_tmp, output_nc, ndf, opt.n_layers_D)
    else error("unsupported netD model")
    end
    
    netD:apply(weights_init)
    
    return netD
end


-- load saved models and finetune
if opt.continue_train == 1 then
   print('loading previously trained netG1...')
   netG1 = util.load(paths.concat(opt.checkpoints_dir, opt.name, opt.which_epoch .. '_net_G.t7'), opt)
   print('loading previously trained netD1...')
   netD1 = util.load(paths.concat(opt.checkpoints_dir, opt.name, opt.which_epoch .. '_net_D.t7'), opt)
   print('loading previously trained netG2...')
   netG2 = util.load(paths.concat(opt.checkpoints_dir, opt.name, opt.which_epoch .. '_net_G2.t7'), opt)
   print('loading previously trained netD2...')
   netD2 = util.load(paths.concat(opt.checkpoints_dir, opt.name, opt.which_epoch .. '_net_D2.t7'), opt)
else
  print('define model netG1...')
  netG1 = defineG(6, output_nc, ngf)
  print('define model netD1...')
  netD1 = defineD(input_nc, output_nc, ndf)
  print('define model netG2...')
  netG2 = defineG_seg(input_nc, input_nc_seg, ngf)
  print('define model netD2...')
  netD2 = defineD(input_nc, input_nc_seg, ndf)
end

print(netG1)
print(netD1)
print(netG2)
print(netD2)


local criterion = nn.BCECriterion()
local criterionAE = nn.AbsCriterion()
---------------------------------------------------------------------------
optimStateG1 = {
   learningRate = opt.lr,
   beta1 = opt.beta1,
}
optimStateG2 = {
   learningRate = opt.lr,
   beta1 = opt.beta1,
}
optimStateD1 = {
   learningRate = opt.lr,
   beta1 = opt.beta1,
}
optimStateD2 = {
   learningRate = opt.lr,
   beta1 = opt.beta1,
}
----------------------------------------------------------------------------
local real_A = torch.Tensor(opt.batchSize, input_nc, opt.fineSize, opt.fineSize)     -- real image view 1
local real_B = torch.Tensor(opt.batchSize, output_nc, opt.fineSize, opt.fineSize)    -- real image view 2
local real_As = torch.Tensor(opt.batchSize, input_nc_seg, opt.fineSize, opt.fineSize)    -- real segmentation image view 1
local real_Bs = torch.Tensor(opt.batchSize, input_nc_seg, opt.fineSize, opt.fineSize)    -- real segmentation image view 2

local real_A_Bs = torch.Tensor(opt.batchSize, 6, opt.fineSize, opt.fineSize)    -- real image view 2

local fake_B = torch.Tensor(opt.batchSize, output_nc, opt.fineSize, opt.fineSize)    -- generated image view 2
local fake_Bs = torch.Tensor(opt.batchSize, output_nc, opt.fineSize, opt.fineSize)   -- generated segmentation image view 2


local real_AB = torch.Tensor(opt.batchSize, output_nc + input_nc*opt.condition_GAN, opt.fineSize, opt.fineSize) -- real image pairs in two views for D1
local fake_AB = torch.Tensor(opt.batchSize, output_nc + input_nc*opt.condition_GAN, opt.fineSize, opt.fineSize) -- image pairs in two views for D1, one is synthesized

local real_AsBs = torch.Tensor(opt.batchSize, input_nc_seg + input_nc_seg*opt.condition_GAN, opt.fineSize, opt.fineSize) -- synthesized image + real segmentation  pair in view-2 for D2
local fake_AsBs = torch.Tensor(opt.batchSize, input_nc_seg + input_nc_seg*opt.condition_GAN, opt.fineSize, opt.fineSize)  -- synthesized image + synthesized segmentation  pair in view-2 for D2

local errD1, errG1, errL11, errD2, errG2, errL12 = 0, 0, 0, 0, 0, 0
local epoch_tm = torch.Timer()
local tm = torch.Timer()
local data_tm = torch.Timer()
----------------------------------------------------------------------------

if opt.gpu > 0 then
   print('transferring to gpu...')
   require 'cunn'
   cutorch.setDevice(opt.gpu)
   real_A = real_A:cuda();
   real_B = real_B:cuda(); 
   fake_B = fake_B:cuda();
   
   real_As = real_As:cuda();
   real_Bs = real_Bs:cuda(); 
   fake_Bs = fake_Bs:cuda();
   real_A_Bs = real_A_Bs:cuda();

   real_AB = real_AB:cuda(); 
   fake_AB = fake_AB:cuda();
   real_AsBs = real_AsBs:cuda(); 
   fake_AsBs = fake_AsBs:cuda();
   if opt.cudnn==1 then
      netG1 = util.cudnn(netG1); netD1 = util.cudnn(netD1);
      netG2 = util.cudnn(netG2); netD2 = util.cudnn(netD2);
   end
   netD1:cuda(); netG1:cuda(); criterion:cuda(); criterionAE:cuda();
   netD2:cuda(); netG2:cuda();  
   print('done')
else
	print('running model on CPU')
end


-- parameters for first network
local parametersD1, gradParametersD1 = netD1:getParameters()
local parametersG1, gradParametersG1 = netG1:getParameters()
-- parameters for second network
local parametersD2, gradParametersD2 = netD2:getParameters()
local parametersG2, gradParametersG2 = netG2:getParameters()

print('D1 parameters:')
print(#parametersD1)
print('G1 parameters:')
print(#parametersG1)
print('D2 parameters:')
print(#parametersD2)
print('G2 parameters:')
print(#parametersG2)

if opt.display then disp = require 'display' end


function createRealFake()
    -- load real
    data_tm:reset(); data_tm:resume()
    local real_data, data_path = data:getBatch()
    data_tm:stop()
    
    real_A:copy(real_data[{ {}, idx_A, {}, {} }])
    real_B:copy(real_data[{ {}, idx_B, {}, {} }])
    -- real_As:copy(real_data[{ {}, idx_As, {}, {} }])
    real_Bs:copy(real_data[{ {}, idx_Bs, {}, {} }])
    real_A_Bs = torch.cat(real_A,real_Bs,2)
    

    -- create fake
    --fake_B = netG1:forward(real_A)
    fake_B = netG1:forward(real_A_Bs)
    fake_Bs = netG2:forward(fake_B)
    
    
    if opt.condition_GAN==1 then
        real_AB = torch.cat(real_A,real_B,2)
        fake_AB = torch.cat(real_A,fake_B,2)
        
        real_AsBs = torch.cat(fake_B,real_Bs,2)
        fake_AsBs = torch.cat(fake_B,fake_Bs,2)
        
        
    else
        real_AB = real_B -- unconditional GAN, only penalizes structure in B
        fake_AB = fake_B -- unconditional GAN, only penalizes structure in B
        real_AsBs = real_Bs
        fake_AsBs = fake_Bs
    end
end


-- create closure to evaluate f(X) and df/dX of discriminator
local fDx1 = function(x)
    netD1:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    netG1:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)

    gradParametersD1:zero()
    
    -- Real
    local output1 = netD1:forward(real_AB)
    local label1 = torch.FloatTensor(output1:size()):fill(real_label)
    
    if opt.gpu>0 then 
    	label1 = label1:cuda()
    end
    
    local errD1_real = criterion:forward(output1, label1)
    local df_do1 = criterion:backward(output1, label1)
        
    netD1:backward(real_AB, df_do1)   
   
    -- Fake
    local output1 = netD1:forward(fake_AB)
    label1:fill(fake_label)
    local errD1_fake = criterion:forward(output1, label1)
    local df_do1 = criterion:backward(output1, label1)
    netD1:backward(fake_AB, df_do1)
    
    errD1 = (errD1_real + errD1_fake)/2
    
    return errD1, gradParametersD1
end

local fDx2 = function(x)
  
    netD2:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    netG2:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    
    gradParametersD2:zero()
    
    -- Real    
    local output2 = netD2:forward(real_AsBs)
    local label2 = torch.FloatTensor(output2:size()):fill(real_label)
    
    if opt.gpu>0 then 
      label2 = label2:cuda()
    end
        
    local errD2_real = criterion:forward(output2, label2)
    local df_do2 = criterion:backward(output2, label2)
    
    netD2:backward(real_AsBs, df_do2)   
   
    -- Fake
    local output2 = netD2:forward(fake_AsBs)
    label2:fill(fake_label)
    local errD2_fake = criterion:forward(output2, label2)
    local df_do2 = criterion:backward(output2, label2)
    netD2:backward(fake_AsBs, df_do2)
    
    errD2 = (errD2_real + errD2_fake)/2
    
    return errD2, gradParametersD2
end


---- create closure to evaluate f(X) and df/dX of generator
local fGx1 = function(x)
    netD1:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    netG1:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    
    gradParametersG1:zero()
    
    -- GAN loss
    local df_dg1 = torch.zeros(fake_B:size())
    if opt.gpu>0 then 
    	df_dg1 = df_dg1:cuda();
    end
    
    if opt.use_GAN==1 then
       -- local output1 = netD1.output1 -- netD1:forward{input_A,input_B} was already executed in fDx1, so save computation
       local output1 = netD1:forward(fake_AB)
       local label1 = torch.FloatTensor(output1:size()):fill(real_label) -- fake labels are real for generator cost
       if opt.gpu>0 then 
       	label1 = label1:cuda();
       	end
       errG1 = criterion:forward(output1, label1)
       local df_do1 = criterion:backward(output1, label1)
       df_dg1 = netD1:updateGradInput(fake_AB, df_do1):narrow(2,fake_AB:size(2)-output_nc+1, output_nc)
    else
        errG1 = 0
    end
    
    -- unary loss
    local df_do_AE1 = torch.zeros(fake_B:size())
    if opt.gpu>0 then 
    	df_do_AE1 = df_do_AE1:cuda();
    end
    if opt.use_L1==1 then
       errL11 = criterionAE:forward(fake_B, real_B)
       df_do_AE1 = criterionAE:backward(fake_B, real_B)
    else
        errL11 = 0
    end
    
    --netG1:backward(real_A, df_dg1 + df_do_AE1:mul(opt.lambda) + grads_seq:mul(opt.lambda_grads))
    netG1:backward(real_A_Bs, df_dg1 + df_do_AE1:mul(opt.lambda) + grads_seq:mul(opt.lambda_grads))
    
    return errG1, gradParametersG1
end


local fGx2 = function(x)
    netD2:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    netG2:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    
    gradParametersG2:zero()
    
    -- GAN loss
    local df_dg1 = torch.zeros(fake_Bs:size())
    if opt.gpu>0 then 
    	df_dg1 = df_dg1:cuda();
    end
    
    if opt.use_GAN==1 then
       local output1 = netD2:forward(fake_AsBs)
       local label1 = torch.FloatTensor(output1:size()):fill(real_label) -- fake labels are real for generator cost
       if opt.gpu>0 then 
       	label1 = label1:cuda();
       	end
       errG2 = criterion:forward(output1, label1)
       local df_do1 = criterion:backward(output1, label1)
       local output_nc_temp = input_nc_seg
       df_dg1 = netD2:updateGradInput(fake_AsBs, df_do1):narrow(2,fake_AsBs:size(2)-output_nc_temp+1, output_nc_temp)
    else
        errG2 = 0
    end
    
    -- unary loss
    local df_do_AE1 = torch.zeros(fake_Bs:size())
    if opt.gpu>0 then 
    	df_do_AE1 = df_do_AE1:cuda();
    end
    if opt.use_L1==1 then
       errL12 = criterionAE:forward(fake_Bs, real_Bs)
       df_do_AE1 = criterionAE:backward(fake_Bs, real_Bs)
    else
        errL12 = 0
    end
    
    grads_seq = netG2:backward(fake_B, df_dg1 + df_do_AE1:mul(opt.lambda))
    
    return errG2, gradParametersG2
end


-- train
local best_err = nil
paths.mkdir(opt.checkpoints_dir)
paths.mkdir(opt.checkpoints_dir .. '/' .. opt.name)

-- save opt
file = torch.DiskFile(paths.concat(opt.checkpoints_dir, opt.name, 'opt.txt'), 'w')
file:writeObject(opt)
file:close()
local counter = 0

if opt.continue_train == 1 then counter = opt.which_epoch end

for epoch = 1 + counter, opt.niter do
    collectgarbage()
    epoch_tm:reset()
    for i = 1, math.min(data:size(), opt.ntrain), opt.batchSize do
    	collectgarbage()
        tm:reset()

        -- load a batch and run G on that batch
        createRealFake()
		
	-- (1) Update D2 network: maximize log(D(x,y)) + log(1 - D(x,G(x)))
        if opt.use_GAN==1 then optim.adam(fDx2, parametersD2, optimStateD2) end
        
        -- (2) Update G2 network: maximize log(D(x,G(x))) + L1(y,G(x))
        optim.adam(fGx2, parametersG2, optimStateG2)

	-- (3) Update D1 network: maximize log(D(x,y)) + log(1 - D(x,G(x)))
        if opt.use_GAN==1 then optim.adam(fDx1, parametersD1, optimStateD1) end
		
        -- (4) Update G1 network: maximize log(D(x,G(x))) + L1(y,G(x))
        optim.adam(fGx1, parametersG1, optimStateG1)
        
        -- display
        counter = counter + 1
        -- logging
        if counter % opt.print_freq == 0 then
            print(('Epoch: [%d][%8d / %8d]\t Time: %.3f  DataTime: %.3f  '
                    .. '  Err_G1: %.4f  Err_D1: %.4f  ErrL11: %.4f  Err_G2: %.4f  Err_D2: %.4f  ErrL12: %.4f'):format(
                     epoch, ((i-1) / opt.batchSize),
                     math.floor(math.min(data:size(), opt.ntrain) / opt.batchSize),
                     tm:time().real / opt.batchSize, data_tm:time().real / opt.batchSize,
                     errG1 and errG1 or -1, errD1 and errD1 or -1, errL11 and errL11 or -1, 
                     errG2 and errG2 or -1, errD2 and errD2 or -1, errL12 and errL12 or -1))
            
            
        end
        
        -- save latest model
        if counter % opt.save_latest_freq == 0 then
            print(('saving the latest model (epoch %d, iters %d)'):format(epoch, counter))
            torch.save(paths.concat(opt.checkpoints_dir, opt.name, 'latest_net_G.t7'), netG1:clearState())
            torch.save(paths.concat(opt.checkpoints_dir, opt.name, 'latest_net_D.t7'), netD1:clearState())
            torch.save(paths.concat(opt.checkpoints_dir, opt.name, 'latest_net_G2.t7'), netG2:clearState())
            torch.save(paths.concat(opt.checkpoints_dir, opt.name, 'latest_net_D2.t7'), netD2:clearState())
        end
        
    end


    parametersD1, gradParametersD1 = nil, nil -- nil them to avoid spiking memory
    parametersG1, gradParametersG1 = nil, nil
    
    parametersD2, gradParametersD2 = nil, nil -- nil them to avoid spiking memory
    parametersG2, gradParametersG2 = nil, nil
    collectgarbage()
    if epoch % opt.save_epoch_freq == 0 then
        torch.save(paths.concat(opt.checkpoints_dir, opt.name,  epoch .. '_net_G.t7'), netG1:clearState())
        torch.save(paths.concat(opt.checkpoints_dir, opt.name, epoch .. '_net_D.t7'), netD1:clearState())
        torch.save(paths.concat(opt.checkpoints_dir, opt.name,  epoch .. '_net_G2.t7'), netG2:clearState())
        torch.save(paths.concat(opt.checkpoints_dir, opt.name, epoch .. '_net_D2.t7'), netD2:clearState())
    end
    
    print(('End of epoch %d / %d \t Time Taken: %.3f'):format(
           epoch, opt.niter, epoch_tm:time().real))
    parametersD1, gradParametersD1 = netD1:getParameters() -- reflatten the params and get them
    parametersG1, gradParametersG1 = netG1:getParameters()
    collectgarbage()
    parametersD2, gradParametersD2 = netD2:getParameters() -- reflatten the params and get them
    parametersG2, gradParametersG2 = netG2:getParameters()
end

