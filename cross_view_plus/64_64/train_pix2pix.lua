-- usage example: DATA_ROOT=/path/to/data/ which_direction=BtoA name=expt1 th train.lua 
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
   batchSize = 8,          -- # images in batch
   loadSize = 286,         -- scale images to this size
   fineSize = 256,         --  then crop to this size
   ngf = 64,               -- #  of gen filters in first conv layer
   ndf = 64,               -- #  of discrim filters in first conv layer
   input_nc = 3,           -- #  of input image channels
   output_nc = 3,          -- #  of output image channels
   niter = 35,            -- #  of iter at starting learning rate  -- was 200
   lr = 0.0002,            -- initial learning rate for adam
   beta1 = 0.5,            -- momentum term of adam
   ntrain = math.huge,     -- #  of examples per epoch. math.huge for full dataset
   flip = 1,               -- if flip the images for data argumentation
   display = 1,            -- display samples while training. 0 = false
   display_id = 10,        -- display window id.
   gpu = 1,                -- gpu = 0 is CPU mode. gpu=X is GPU mode on GPU X, gpu = 1 used generally
   name = 'a2g_pix2pix',              -- name of the experiment, should generally be passed on the command line
   which_direction = 'a2g',    -- g2a or a2g
   phase = 'sample',             -- train, val, test, etc
   preprocess = 'regular',      -- for special purpose preprocessing, e.g., for colorization, change this (selects preprocessing functions in util.lua)
   nThreads = 4,                -- # threads for loading data
   save_epoch_freq = 1,        -- save a model every save_epoch_freq epochs (does not overwrite previously saved models)
   save_latest_freq = 6875,     -- save the latest model every latest_freq sgd iterations (overwrites the previous latest model)
   print_freq = 1,             -- print the debug information every print_freq iterations
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
   which_model_netD = 'basic_D', -- selects model to use for netD
   which_model_netG = 'encoder_decoder', -- selects model to use for netG, mynetG_256_64, mynetG_64_64, fuseNet_dense, fuseNet_256
   n_layers_D = 0,             -- only used if which_model_netD=='n_layers'
   lambda = 100,               -- weight on L1 term in objective
   which_epoch = '0',            -- epoch number to resume training, used only if continue_train=1
}


-- one-line argument parser. parses enviroment variables to override the defaults
for k,v in pairs(opt) do opt[k] = tonumber(os.getenv(k)) or os.getenv(k) or opt[k] end
print(opt)


local input_nc = opt.input_nc
local output_nc = opt.output_nc

-- translation direction
local idx_A = nil
local idx_B = nil
local idx_As = nil
local idx_Bs = nil

-- if opt.which_direction=='g2a' then
--     idx_A = {1, input_nc}
--     idx_B = {input_nc + 1, input_nc + output_nc}   
-- elseif opt.which_direction=='a2g' then
--     idx_A = {input_nc + 1, input_nc + output_nc}
--     idx_B = {1, input_nc}    
-- else
--     error(string.format('bad direction %s',opt.which_direction))
-- end

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

function defineG(input_nc, output_nc_seg, output_nc, ngf)
    local netG = nil
    if  opt.which_model_netG == "encoder_decoder" then netG = defineG_encoder_decoder(input_nc, output_nc, ngf)
    else    error("unsupported netG model")
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
    
    if     opt.which_model_netD == "basic_D" then netD = defineD_basic(input_nc_tmp, output_nc, ndf)
    elseif opt.which_model_netD == "n_layers" then netD = defineD_n_layers(input_nc_tmp, output_nc, ndf, opt.n_layers_D)
    else error("unsupported netD model")
    end
    
    netD:apply(weights_init)
    
    return netD
end


-- load saved models and finetune
if opt.continue_train == 1 then
   print('loading previously trained netG...')
   netG = util.load(paths.concat(opt.checkpoints_dir, opt.name, opt.which_epoch .. '_net_G.t7'), opt)
   print('loading previously trained netD...')
   netD = util.load(paths.concat(opt.checkpoints_dir, opt.name, opt.which_epoch .. '_net_D.t7'), opt)
else
  print('define model netG...')
  netG =  defineG(6, output_nc_seg, output_nc, ngf)
  print('define model netD...')
  netD = defineD(input_nc, output_nc, ndf)
end


print(netG)
print(netD)


local criterion = nn.BCECriterion()
local criterionAE = nn.AbsCriterion()

---------------------------------------------------------------------------

optimStateD = {
   learningRate = opt.lr,
   beta1 = opt.beta1,
}

optimStateG = {
   learningRate = opt.lr,
   beta1 = opt.beta1,
}
----------------------------------------------------------------------------
local real_A = torch.Tensor(opt.batchSize, input_nc, opt.fineSize, opt.fineSize)     -- real image view 1

local Bs = torch.Tensor(opt.batchSize, input_nc, opt.fineSize, opt.fineSize)     -- real image view 1

local real_B = torch.Tensor(opt.batchSize, output_nc, opt.fineSize, opt.fineSize)    -- real image view 2
local real_A_Bs = torch.Tensor(opt.batchSize, 6, opt.fineSize, opt.fineSize)    -- real image view 2
local fake_B = torch.Tensor(opt.batchSize, output_nc, opt.fineSize, opt.fineSize)    -- generated image view 2

local real_AB = torch.Tensor(opt.batchSize, output_nc + input_nc*opt.condition_GAN, opt.fineSize, opt.fineSize) -- real image pairs in two views for D
local fake_AB = torch.Tensor(opt.batchSize, output_nc + input_nc*opt.condition_GAN, opt.fineSize, opt.fineSize) -- image pairs in two views for D, one is synthesized

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
   Bs = Bs:cuda();
   real_A_Bs = real_A_Bs:cuda();


   real_AB = real_AB:cuda(); 
   fake_AB = fake_AB:cuda();

   if opt.cudnn==1 then
      netG = util.cudnn(netG); 
      netD = util.cudnn(netD);
   end
   criterion:cuda(); criterionAE:cuda();
   netD:cuda(); 
   netG:cuda();  
   print('done')
else
	print('running model on CPU')
end


-- parameters for network
local parametersD, gradParametersD = netD:getParameters()
local parametersG, gradParametersG = netG:getParameters()

print('D parameters:')
print(#parametersD)
print('G parameters:')
print(#parametersG)


function createRealFake()
  collectgarbage()

    -- load real
    data_tm:reset(); data_tm:resume()
    local real_data, data_path = data:getBatch()
    data_tm:stop()
    
    real_A:copy(real_data[{ {}, idx_A, {}, {} }])
    real_B:copy(real_data[{ {}, idx_B, {}, {} }])
    Bs:copy(real_data[{ {}, idx_Bs, {}, {} }])
    real_A_Bs = torch.cat(real_A,Bs,2)
    
    if opt.condition_GAN==1 then
        real_AB = torch.cat(real_A,real_B,2)
    else
        real_AB = real_B -- unconditional GAN, only penalizes structure in B
    end
    
    -- create fake
    -- fake_B = netG:forward(real_A)
    fake_B = netG:forward(real_A_Bs)
    
    if opt.condition_GAN==1 then
        fake_AB = torch.cat(real_A,fake_B,2)
    else
        fake_AB = fake_B -- unconditional GAN, only penalizes structure in B
    end
end

-- create closure to evaluate f(X) and df/dX of discriminator
local fDx = function(x)
  collectgarbage()
    netD:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    netG:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    
    gradParametersD:zero()
    
    -- Real
    local output = netD:forward(real_AB)
    local label = torch.FloatTensor(output:size()):fill(real_label)
    if opt.gpu>0 then 
      label = label:cuda()
    end
    
    local errD_real = criterion:forward(output, label)
    local df_do = criterion:backward(output, label)
    netD:backward(real_AB, df_do)
    
    -- Fake
    output = netD:forward(fake_AB)
    label:fill(fake_label)
    local errD_fake = criterion:forward(output, label)
    local df_do = criterion:backward(output, label)
    netD:backward(fake_AB, df_do)
    
    errD = (errD_real + errD_fake)/2
    
    return errD, gradParametersD
end

-- create closure to evaluate f(X) and df/dX of generator
local fGx = function(x)
  collectgarbage()

    netD:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    netG:apply(function(m) if torch.type(m):find('Convolution') then m.bias:zero() end end)
    
    gradParametersG:zero()
    
    -- GAN loss
    local df_dg = torch.zeros(fake_B:size())
    if opt.gpu>0 then 
      df_dg = df_dg:cuda();
    end
    
    if opt.use_GAN==1 then
       local output = netD.output -- netD:forward{input_A,input_B} was already executed in fDx, so save computation
       local label = torch.FloatTensor(output:size()):fill(real_label) -- fake labels are real for generator cost
       if opt.gpu>0 then 
        label = label:cuda();
        end
       errG = criterion:forward(output, label)
       local df_do = criterion:backward(output, label)
       df_dg = netD:updateGradInput(fake_AB, df_do):narrow(2,fake_AB:size(2)-output_nc+1, output_nc)
    else
        errG = 0
    end
    
    -- unary loss
    local df_do_AE = torch.zeros(fake_B:size())
    if opt.gpu>0 then 
      df_do_AE = df_do_AE:cuda();
    end
    if opt.use_L1==1 then
       errL1 = criterionAE:forward(fake_B, real_B)
       df_do_AE = criterionAE:backward(fake_B, real_B)
    else
        errL1 = 0
    end
    
    -- netG:backward(real_A, df_dg + df_do_AE:mul(opt.lambda))
    netG:backward(real_A_Bs, df_dg + df_do_AE:mul(opt.lambda))
    
    return errG, gradParametersG
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

for epoch = 1 + opt.which_epoch, opt.niter do
  collectgarbage()
    epoch_tm:reset()
    errD_sum, errG_sum, errL1_sum = 0, 0, 0 -- Krishna's code 

    for i = 1, math.min(data:size(), opt.ntrain), opt.batchSize do
      collectgarbage()
        tm:reset()

        
        -- load a batch and run G on that batch
        createRealFake()
        
        -- (1) Update D network: maximize log(D(x,y)) + log(1 - D(x,G(x)))
        if opt.use_GAN==1 then optim.adam(fDx, parametersD, optimStateD) end
        
        -- (2) Update G network: maximize log(D(x,G(x))) + L1(y,G(x))
        optim.adam(fGx, parametersG, optimStateG)

        -- display
        counter = counter + 1
   
       -- logging and display plot
        if counter % opt.print_freq == 0 then
            local loss = {errG=errG and errG or -1, errD=errD and errD or -1, errL1=errL1 and errL1 or -1}
            local curItInBatch = ((i-1) / opt.batchSize)
            local totalItInBatch = math.floor(math.min(data:size(), opt.ntrain) / opt.batchSize)
            print(('Epoch: [%d][%8d / %8d]\t Time: %.3f  DataTime: %.3f  '
                    .. '  Err_G: %.4f  Err_D: %.4f  ErrL1: %.4f'):format(
                     epoch, curItInBatch, totalItInBatch,
                     tm:time().real / opt.batchSize, data_tm:time().real / opt.batchSize,
                     errG, errD, errL1))
        end

        errD_sum = errD_sum+errD
        errG_sum = errG_sum+errG
        errL1_sum = errL1_sum+errL1
        
        -- save latest model
        if counter % opt.save_latest_freq == 0 then
            print(('saving the latest model (epoch %d, iters %d)'):format(epoch, counter))
            torch.save(paths.concat(opt.checkpoints_dir, opt.name, 'latest_net_G.t7'), netG:clearState())
            torch.save(paths.concat(opt.checkpoints_dir, opt.name, 'latest_net_D.t7'), netD:clearState())
        end
        
    end

    factor = opt.batchSize/data:size()

    Error_D_epoch = errD_sum*factor
    Error_G_epoch = errG_sum*factor
    Error_L1_epoch = errL1_sum*factor
    
    print(('Training Set: Epoch: [%d]\t '
                    .. '  Err_G: %.4f  Err_D: %.4f  ErrL1: %.4f'):format(epoch, 
                     Error_G_epoch and Error_G_epoch or -1, Error_D_epoch and Error_D_epoch  or -1, Error_L1_epoch and Error_L1_epoch or -1))
    


    
    parametersD, gradParametersD = nil, nil -- nil them to avoid spiking memory
    parametersG, gradParametersG = nil, nil
    
    if epoch % opt.save_epoch_freq == 0 then
        torch.save(paths.concat(opt.checkpoints_dir, opt.name,  epoch .. '_net_G.t7'), netG:clearState())
        torch.save(paths.concat(opt.checkpoints_dir, opt.name, epoch .. '_net_D.t7'), netD:clearState())
    end

    collectgarbage()
    parametersD, gradParametersD = netD:getParameters() -- reflatten the params and get them
    parametersG, gradParametersG = netG:getParameters()
    -- collectgarbage()
end