require 'nn'


local iscuda=...

-- useful to fast image gradient computation
dy = nn.Sequential()
dy:add(nn.SpatialZeroPadding(0,0,1, -1))


dx = nn.Sequential()
dx:add(nn.SpatialZeroPadding(1, -1, 0, 0))

if iscuda==true then
dy:cuda()
dx:cuda()
end


--------------------------------------------------------------------------------
-- Calcul du PSNR entre 2 images
function PSNR(true_frame, pred)

   local eps = 0.0001
  -- if true_frame:size(1) == 1 then true_frame = true_frame[1] end
  -- if pred:size(1) == 1 then pred = pred[1] end

   local prediction_error = 0
   for i = 1, pred:size(2) do
          for j = 1, pred:size(3) do
            for c = 1, pred:size(1) do
            -- put image from -1 to 1 to 0 and 255
            prediction_error = prediction_error +
              (pred[c][i][j] - true_frame[c][i][j])^2
            end
          end
   end
   --MSE
   prediction_error=128*128*prediction_error/(pred:size(1)*pred:size(2)*pred:size(3))

   --PSNR
   if prediction_error>eps then
      prediction_error = 10*torch.log((255*255)/ prediction_error)/torch.log(10)
   else
      prediction_error = 10*torch.log((255*255)/ eps)/torch.log(10)
   end
   return prediction_error
end


--------------------------------------------------------------------------------
-- Calcul du SSIM
function SSIM(img1, img2)
  --[[
  %This is an implementation of the algorithm for calculating the
  %Structural SIMilarity (SSIM) index between two images. Please refer
  %to the following paper:
  %
  %Z. Wang, A. C. Bovik, H. R. Sheikh, and E. P. Simoncelli, "Image
  %quality assessment: From error visibility to structural similarity"
  %IEEE Transactios on Image Processing, vol. 13, no. 4, pp.600-612,
  %Apr. 2004.
  %

  %Input : (1) img1: the first image being compared
  %        (2) img2: the second image being compared
  %        (3) K: constants in the SSIM index formula (see the above
  %            reference). defualt value: K = [0.01 0.03]
  %        (4) window: local window for statistics (see the above
  %            reference). default widnow is Gaussian given by
  %            window = fspecial('gaussian', 11, 1.5);
  %        (5) L: dynamic range of the images. default: L = 255
  %
  %Output:     mssim: the mean SSIM index value between 2 images.
  %            If one of the images being compared is regarded as
  %            perfect quality, then mssim can be considered as the
  %            quality measure of the other image.
  %            If img1 = img2, then mssim = 1.]]


   if img1:size(1) > 2 then
    img1 = image.rgb2y(img1)
    img1 = img1[1]
    img2 = image.rgb2y(img2)
    img2 = img2[1]
   end

   -- place images between 0 and 255.

   img1:mul(255)
   img2:mul(255)

   local K1 = 0.01;
   local K2 = 0.03;
   local L = 255;

   local C1 = (K1*L)^2;
   local C2 = (K2*L)^2;
   local window = image.gaussian(11, 1.5/11,0.0708);

   local window = window:div(torch.sum(window));

   local mu1 = image.convolve(img1, window, 'full')
   local mu2 = image.convolve(img2, window, 'full')

   local mu1_sq = torch.cmul(mu1,mu1);
   local mu2_sq = torch.cmul(mu2,mu2);
   local mu1_mu2 = torch.cmul(mu1,mu2);

   local sigma1_sq = image.convolve(torch.cmul(img1,img1),window,'full')-mu1_sq
   local sigma2_sq = image.convolve(torch.cmul(img2,img2),window,'full')-mu2_sq
   local sigma12 =  image.convolve(torch.cmul(img1,img2),window,'full')-mu1_mu2

   local ssim_map = torch.cdiv( torch.cmul((mu1_mu2*2 + C1),(sigma12*2 + C2)) ,
     torch.cmul((mu1_sq + mu2_sq + C1),(sigma1_sq + sigma2_sq + C2)));
   local mssim = torch.mean(ssim_map);
   return mssim
end



------------------------------------------------------------------------------
-- image sharpeness difference measure

function computel1difference(img_pred, img_true )
  s = img_true:size()

  if img_pred:size(1)==2 then
img_pred = img_pred[{{1},{},{}}]
  end

local eps = 0.0001
local diff_gradients = torch.abs(
    torch.abs(dx:forward(img_pred)-img_pred)[{{},{2,s[2]-1},{2,s[3]-1}}] -
    torch.abs(dx:forward(img_true)-img_true)[{{},{2,s[2]-1},{2,s[3]-1}}]) +
                       torch.abs(
    torch.abs(dy:forward(img_pred)-img_pred)[{{},{2,s[2]-1},{2,s[3]-1}}] -
    torch.abs(dy:forward(img_true)-img_true)[{{},{2,s[2]-1},{2,s[3]-1}}])
 local prediction_error = torch.sum(diff_gradients)

   -- Mean
   prediction_error=128*128*prediction_error/(s[1]*s[2]*s[3])

   if prediction_error>eps then
      prediction_error = 10*torch.log((255*255)/ prediction_error)/torch.log(10)
   else
      prediction_error = 10*torch.log((255*255)/ eps)/torch.log(10)
   end

   return prediction_error
end

