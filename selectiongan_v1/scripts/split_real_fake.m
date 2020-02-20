close all; clear all; clc
path='./results/sva_selectiongan/test_latest/';

Image_folder=    strcat(path, 'images');
save_fake_folder=strcat(path, 'fakeimage_B');
save_I_folder=   strcat(path, 'output_image');
save_real_folder=strcat(path, 'realimage_B');

if ~isdir(save_I_folder)
    mkdir(save_I_folder)
end

if ~isdir(save_fake_folder)
    mkdir(save_fake_folder)
end

if ~isdir(save_real_folder)
    mkdir(save_real_folder)
end

Image = dir( Image_folder );  
for i = 1 : length( Image )
    if( isequal( Image( i ).name, '.' ) || isequal( Image( i ).name, '..' ))  
        continue;
    end
    image_name=Image( i ).name;
    fprintf('%d / %d \n', i, length(Image))
    if contains(image_name, '_I.png')   
        copyfile(fullfile(Image_folder, image_name), fullfile(save_I_folder, strcat(image_name(1:length(image_name)-6),'.png')));
    elseif contains(image_name, '_real_B.png')
        copyfile(fullfile(Image_folder, image_name), fullfile(save_real_folder, strcat(image_name(1:length(image_name)-11),'.png')));
    elseif contains(image_name, '_fake_B.png')
        copyfile(fullfile(Image_folder, image_name), fullfile(save_fake_folder, strcat(image_name(1:length(image_name)-11),'.png')));
    end  
end
