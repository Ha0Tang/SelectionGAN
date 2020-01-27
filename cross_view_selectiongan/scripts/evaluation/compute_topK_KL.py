# by Krishna Regmi

import sys
import torch
from torch.autograd import Variable as V
import torchvision.models as models
from torchvision import transforms as trn
from torch.nn import functional as F
import os
from PIL import Image
import numpy as np
import multiprocessing
from numba import autojit, prange

def compute_KL(conditional_prob, n, stripout_zeros):
    marginal_prob = np.mean(conditional_prob, 0)
    marginal_prob_log = np.log(marginal_prob)
    log_diff_mult = np.zeros_like(conditional_prob)

    for i in range(n):
        conditional_prob_log = np.log(conditional_prob[i][:])
        log_diff = conditional_prob_log - marginal_prob_log
        log_diff_mult[i][:] = conditional_prob[i][:] * log_diff

    kl = np.mean(np.sum(log_diff_mult, 1))
    scores = (np.exp(kl))
    # print scores
    return scores


def compute_topK_cond_prob_with_epsilon(conditional_prob, k, n):
    cond_prob_top_k = np.zeros_like(conditional_prob)
    epsilon = 0.000000001 
    for j in range(n):
        cond_prob = conditional_prob[j][:]
        sorted_indices = [b[0] for b in sorted(enumerate(cond_prob),key=lambda i:i[1], reverse=True)]
        indices_for_top_k = sorted_indices[0:k]
        # print indices_for_top_k
        for ind in range(len(cond_prob)):
            if(ind not in indices_for_top_k ):
                cond_prob[ind] = epsilon
        cond_prob_top_k[j] = cond_prob
    return cond_prob_top_k


def perform_eval(parameter_list):
    n = parameter_list[0]
    img_real = parameter_list[1]
    img_pix2pix = parameter_list[2]
    p_y_x_real = parameter_list[3]
    p_y_x_pix2pix = parameter_list[4]
    model = parameter_list[5]
    img_name = files[n]    
    img_path_real =  img_real + '/' + img_name
    img_path_pix2pix =  img_pix2pix + '/' + img_name

    im_real = Image.open(img_path_real)
    im_pix2pix = Image.open(img_path_pix2pix)
    
    input_img_real = V(centre_crop(im_real).unsqueeze(0), volatile=True)
    input_img_pix2pix = V(centre_crop(im_pix2pix).unsqueeze(0), volatile=True)

    # forward pass
    logit_real = model.forward(input_img_real)
    h_x_real = F.softmax(logit_real).data.squeeze()
    p_y_x_real[i] = h_x_real.numpy()


    # forward pass
    logit_pix2pix = model.forward(input_img_pix2pix)
    h_x_pix2pix = F.softmax(logit_pix2pix).data.squeeze()
    p_y_x_pix2pix[i] = h_x_pix2pix.numpy()

    if(n % 500 == 0):
        print n

arch = 'alexnet' #resnet50, alexnet
# load the pre-trained weights
model_weight = 'whole_%s_places365.pth.tar' % arch
if not os.access(model_weight, os.W_OK):
    weight_url = 'http://places2.csail.mit.edu/models_places365/whole_%s_places365.pth.tar' % arch
    os.system('wget ' + weight_url)

useGPU = 1
if useGPU == 1:
    model = torch.load(model_weight)
else:
    model = torch.load(model_weight, map_location=lambda storage, loc: storage) # model trained in GPU could be deployed in CPU machine like this!

model.eval()

centre_crop = trn.Compose([
        trn.Resize(256),
        trn.CenterCrop(224),
        trn.ToTensor(),
        trn.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])


# load the test image

img_real =sys.argv[1]
img_pix2pix =sys.argv[2]


path, root, files = os.walk(img_pix2pix).next()
n = len(files)
# n = 10
print n

p_y_x_real = np.ndarray((n, 365), )
p_y_x_pix2pix = np.ndarray((n, 365), )
# p_y_x_stacked = np.ndarray((n, 365), )
# p_y_x_fork = np.ndarray((n, 365), )
# p_y_x_x_seq = np.ndarray((n, 365), )

# pool = multiprocessing.Pool(processes=16)
# pool.map(perform_eval, [range(n), img_real, img_pix2pix, p_y_x_real, p_y_x_pix2pix, model])
# pool.close()
# pool.join()

# x = []
for i in prange(n):
    img_name = files[i]

    img_path_real =  img_real + '/' + img_name
    img_path_pix2pix =  img_pix2pix + '/' + img_name

    im_real = Image.open(img_path_real)
    im_pix2pix = Image.open(img_path_pix2pix)


    input_img_real = V(centre_crop(im_real).unsqueeze(0), volatile=True)
    input_img_pix2pix = V(centre_crop(im_pix2pix).unsqueeze(0), volatile=True)

    # forward pass
    logit_real = model.forward(input_img_real)
    h_x_real = F.softmax(logit_real).data.squeeze()
    p_y_x_real[i] = h_x_real.numpy()


    # forward pass
    logit_pix2pix = model.forward(input_img_pix2pix)
    h_x_pix2pix = F.softmax(logit_pix2pix).data.squeeze()
    p_y_x_pix2pix[i] = h_x_pix2pix.numpy()


    if(i % 500 == 0):
        print i
        
p_y_x_real_clone = np.empty_like(p_y_x_real)
p_y_x_real_clone[:][:] = p_y_x_real

p_y_x_pix2pix_clone = np.empty_like(p_y_x_pix2pix)
p_y_x_pix2pix_clone[:][:] = p_y_x_pix2pix

print "\n"

kl = compute_KL(p_y_x_real_clone, n, "False")
print "kl for real is :"+ str(kl)

kl = compute_KL(p_y_x_pix2pix_clone, n, "False")
print "kl for pix2pix is :"+ str(kl)


k = 1
print "\nFor k = " + str(k)



topk_cond_prob_with_epsilon_real =  compute_topK_cond_prob_with_epsilon(p_y_x_real_clone, k, n)
kl = compute_KL(topk_cond_prob_with_epsilon_real, n, "False")
print "kl for real is :"+ str(kl)

topk_cond_prob_with_epsilon_pix2pix =  compute_topK_cond_prob_with_epsilon(p_y_x_pix2pix_clone, k, n)
kl = compute_KL(topk_cond_prob_with_epsilon_pix2pix, n, "False")
print "kl for pix2pix is :"+ str(kl)


k = 5
print "\nFor k = " + str(k)

topk_cond_prob_with_epsilon_real_5 =  compute_topK_cond_prob_with_epsilon(p_y_x_real, k, n)
kl = compute_KL(topk_cond_prob_with_epsilon_real_5, n, "False")
print "kl for real is :"+ str(kl)

topk_cond_prob_with_epsilon_pix2pix_5 =  compute_topK_cond_prob_with_epsilon(p_y_x_pix2pix, k, n)
kl = compute_KL(topk_cond_prob_with_epsilon_pix2pix_5, n, "False")
print "kl for pix2pix is :"+ str(kl)


# # ####################################################################################################################

