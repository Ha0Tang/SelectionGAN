clear all;close all;clc

txt_path='./exp_file.txt';

data=importdata(txt_path);
number_image=size(data.data,1)
sum_score=sum(data.data);

final_lpips=sum_score/number_image

[val, idx] = min(data.data);
id = find(data.data == val);
data.textdata{id};
