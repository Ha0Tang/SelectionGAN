-- th compute_ssim_psnr_sharpness.lua ./realimage_folder ./fakeimage_folder 

require 'torch'
require 'paths'
require 'image'
require 'my_image_error_measures'
local lfs  = require 'lfs'



path_true   = arg[1]
path_synthesized = arg[2]

local list_of_filenames = {}
local filenamesonly_no_dir = {}

for file in lfs.dir(path_synthesized) do -- get the list of the files
	if file~="." and file~=".." then
    table.insert(filenamesonly_no_dir, file)
    end
end

local number_of_files = #filenamesonly_no_dir
ssim_synthesized = 0.0
sharpness_synthesized = 0.0
psnr_synthesized = 0.0


for inputs = 1, number_of_files  do   -- number_of_files   --define no of images to compute upon
  filename = filenamesonly_no_dir[inputs]

  local img_true = path_true..'/'..filename
  local img_synthesized = path_synthesized..'/'..filename
  local im_true = image.load(img_true)
  local im_synthesized = image.load(img_synthesized)

  ssim_synthesized = ssim_synthesized + SSIM(im_true, im_synthesized)
  psnr_synthesized = psnr_synthesized + PSNR(im_true, im_synthesized)
  sharpness_synthesized = sharpness_synthesized + computel1difference(im_true, im_synthesized)

  if inputs%500 ==0 then
  	print("..........................................\n")
  	print("Images into consideration:"..inputs.."\n")
    print ("For synthesized: ")
    print ("SSIM: "..ssim_synthesized/inputs)
    print ("PSNR: "..psnr_synthesized/inputs)
    print ("Sharpness: "..sharpness_synthesized/inputs)
    print("")
  end

end

print("\n..........................................\n")
print("Final numbers\n")
print("Images into consideration:"..number_of_files.."\n")
-- print ("For synthesized: ")
print ("SSIM: "..ssim_synthesized/number_of_files)
print ("PSNR: "..psnr_synthesized/number_of_files)
print ("Sharpness: "..sharpness_synthesized/number_of_files)

-------------------------------------------------------------------------------------------------------------------------------