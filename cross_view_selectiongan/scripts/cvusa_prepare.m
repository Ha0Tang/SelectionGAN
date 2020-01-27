clear all;close all;clc
% cvs_path='./cvusa/splits/train-19zl.csv';
cvs_path='./cvusa/splits/val-19zl.csv';
image_path='./cvusa';

% save_folder='./cvusa/train';
save_folder='./cvusa/test';

if ~isfolder(save_folder)
    mkdir(save_folder)
end

data = importdata(cvs_path);
for i=1:length(data)
        fprintf('%d / %d \n', i, length(data));
    three_name=data{i};
    k = strfind(three_name,',');
    a=three_name(1:k(1)-1);
    b=three_name(k(1)+1:k(2)-1);
    c=three_name(k(2)+1:length(three_name));
    a1=strcat(image_path,'/', a);
    b1=strcat(image_path,'/', b);
    c1=strcat(image_path,'/', c);
    a2=imread(a1);
    b2=imread(b1);
    c2=imread(c1);

    a3=imresize(a2,[256, 256]);
    b3=imresize(b2,[256, 1024]);
    c3=imresize(c2,[256,1024]);
    d=a3;
    d(:,:,:)=0;

    img=[a3,b3,d,c3];
    imwrite(img, fullfile(save_folder, strcat(a(length(a)-11:length(a)-3), 'png')));
end