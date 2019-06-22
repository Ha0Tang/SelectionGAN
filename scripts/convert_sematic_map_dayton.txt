clear all;close all;clc

image_folder='./cvusa/streetview/annotations';
save_folder='./cvusa/streetview/annotations_color';

if ~isdir(save_folder)
    mkdir(save_folder)
end

Image =  dir( image_folder );  
for i = 1 : length( Image )
    fprintf('%d / %d \n', i, length(Image));
    if( isequal( Image( i ).name, '.' ) || isequal( Image( i ).name, '..' ))  
        continue;
    end
    image_name=Image( i ).name;
    image_path=fullfile(image_folder, image_name);
    img=imread(image_path);
    image(:,:,1)=img;
    image(:,:,2)=img;
    image(:,:,3)=img;
        
    for r =1:size(img,1)
    for c=1:size(img,2)
      if image(r, c, 1) == 0 % sky 
        image(r, c, :) = [0, 0, 0]; % black
      elseif image(r, c, 1) == 1 % man-made
        image(r, c, :) = [0, 0, 255];  % blue 
      elseif image(r, c, 1) == 2 % road
        image(r, c, :) = [255, 0, 0]  ; % red
      else  % vegetation
        image(r, c, :) = [0, 255, 0]; % green;
      end
    end
    end
    imwrite(image, fullfile(save_folder, image_name));
end
