
--[[
    This data loader is a modified version of the one from dcgan.torch
    (see https://github.com/soumith/dcgan.torch/blob/master/data/donkey_folder.lua).
    Copyright (c) 2016, Deepak Pathak [See LICENSE file for details]
    Copyright (c) 2015-present, Facebook, Inc.
    All rights reserved.
    This source code is licensed under the BSD-style license found in the
    LICENSE file in the root directory of this source tree. An additional grant
    of patent rights can be found in the PATENTS file in the same directory.
]]--

require 'image'
paths.dofile('dataset.lua')
-- This file contains the data-loading logic and details.
-- It is run by each data-loader thread.
------------------------------------------
-------- COMMON CACHES and PATHS
-- Check for existence of opt.data
print(os.getenv('DATA_ROOT'))
opt.data = paths.concat(os.getenv('DATA_ROOT'), opt.phase)
-- opt.data = paths.concat('/home/user/Documents/DATASET/dayton/AB_AsBs_3c_seg', opt.phase)

if not paths.dirp(opt.data) then
    error('Did not find directory: ' .. opt.data)
end

-- a cache file of the training metadata (if doesnt exist, will be created)
local cache = "cache"
local cache_prefix = opt.data:gsub('/', '_')
os.execute('mkdir -p cache')
local trainCache = paths.concat(cache, cache_prefix .. '_trainCache.t7')

--------------------------------------------------------------------------------------------
local input_nc = opt.input_nc -- input channels
local output_nc = opt.output_nc
local loadSize   = {input_nc, opt.loadSize}
local sampleSize = {input_nc, opt.fineSize}

local preprocessAandB = function(imA, imB, imAs, imBs)
  imA = image.scale(imA, loadSize[2], loadSize[2])
  imB = image.scale(imB, loadSize[2], loadSize[2])
  imAs = image.scale(imAs, loadSize[2], loadSize[2])
  imBs = image.scale(imBs, loadSize[2], loadSize[2])
  
  local perm = torch.LongTensor{3, 2, 1}
  
  imA = imA:index(1, perm)--:mul(256.0): brg, rgb
  imA = imA:mul(2):add(-1)
  imB = imB:index(1, perm)
  imB = imB:mul(2):add(-1)
  
  imAs = imAs:index(1, perm)--:mul(256.0): brg, rgb
  imAs = imAs:mul(2):add(-1)
  imBs = imBs:index(1, perm)
  imBs = imBs:mul(2):add(-1)
  
  assert(imA:max()<=1,"A: badly scaled inputs")
  assert(imA:min()>=-1,"A: badly scaled inputs")
  assert(imB:max()<=1,"B: badly scaled inputs")
  assert(imB:min()>=-1,"B: badly scaled inputs")
  
  assert(imAs:max()<=1,"As: badly scaled inputs")
  assert(imAs:min()>=-1,"As: badly scaled inputs")
  assert(imBs:max()<=1,"Bs: badly scaled inputs")
  assert(imBs:min()>=-1,"Bs: badly scaled inputs")
 
  
  local oW = sampleSize[2]
  local oH = sampleSize[2]
  local iH = imA:size(2)
  local iW = imA:size(3)
  
  if iH~=oH then     
    h1 = math.ceil(torch.uniform(1e-2, iH-oH))
  end
  
  if iW~=oW then
    w1 = math.ceil(torch.uniform(1e-2, iW-oW))
  end
  if iH ~= oH or iW ~= oW then 
    imA = image.crop(imA, w1, h1, w1 + oW, h1 + oH)
    imB = image.crop(imB, w1, h1, w1 + oW, h1 + oH)
    imAs = image.crop(imAs, w1, h1, w1 + oW, h1 + oH)
    imBs = image.crop(imBs, w1, h1, w1 + oW, h1 + oH)
  end
  
  if opt.flip == 1 and torch.uniform() > 0.5 then 
    imA = image.hflip(imA)
    imB = image.hflip(imB)
    imAs = image.hflip(imAs)
    imBs = image.hflip(imBs)
  end
  
  return imA, imB, imAs, imBs
end    


--local function loadImage

local function loadImage(path)
   local input = image.load(path, 3, 'float')
   local h = input:size(2)
   local w = input:size(3)

   local imA = image.crop(input, 0, 0, w/4, h)
   local imB = image.crop(input, w/4, 0, w/2, h)
   local imAs = image.crop(input, w/2, 0, 3*w/4, h)
   local imBs = image.crop(input, 3*w/4, 0, w, h)
   
   return imA, imB, imAs, imBs
end

-- channel-wise mean and std. Calculate or load them from disk later in the script.
local mean,std
--------------------------------------------------------------------------------
-- Hooks that are used for each image that is loaded

-- function to load the image, jitter it appropriately (random crops etc.)
local trainHook = function(self, path)
   collectgarbage()
   if opt.preprocess == 'regular' then
     local imA, imB, imAs, imBs = loadImage(path)
     imA, imB, imAs, imBs = preprocessAandB(imA, imB, imAs, imBs)
     imABAsBs = torch.cat(imA, imB, 1):cat(imAs, 1):cat(imBs, 1) 
   end
   return imABAsBs
end

--------------------------------------
-- trainLoader
print('trainCache', trainCache)
--if paths.filep(trainCache) then
--   print('Loading train metadata from cache')
--   trainLoader = torch.load(trainCache)
--   trainLoader.sampleHookTrain = trainHook
--   trainLoader.loadSize = {input_nc, opt.loadSize, opt.loadSize}
--   trainLoader.sampleSize = {input_nc+output_nc, sampleSize[2], sampleSize[2]}
--   trainLoader.serial_batches = opt.serial_batches
--   trainLoader.split = 100
--else
print('Creating train metadata')
--   print(opt.data)
print('serial batch:, ', opt.serial_batches)
trainLoader = dataLoader{
    paths = {opt.data},
    loadSize = {input_nc, loadSize[2], loadSize[2]},
    sampleSize = {2*(input_nc+output_nc), sampleSize[2], sampleSize[2]},
    split = 100,
    serial_batches = opt.serial_batches, 
    verbose = true
 }
--   print('finish')
--torch.save(trainCache, trainLoader)
--print('saved metadata cache at', trainCache)
trainLoader.sampleHookTrain = trainHook
--end
collectgarbage()

-- do some sanity checks on trainLoader
do
   local class = trainLoader.imageClass
   local nClasses = #trainLoader.classes
   assert(class:max() <= nClasses, "class logic has error")
   assert(class:min() >= 1, "class logic has error")
end