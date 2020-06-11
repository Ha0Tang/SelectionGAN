clear all;close all;clc

image_folder='./datasets/dayton/test';
save_folder='./datasets/dayton_g2a/test';

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
    imshow(img)
    image1=img(1:256,1:256,:);
    image2=img(1:256,257:512,:);
    image3=img(1:256,513:768,:);
    image4=img(1:256,769:1024,:);
    im=[image2, image1,image4,image3];

    imwrite(im, fullfile(save_folder, image_name));
end
