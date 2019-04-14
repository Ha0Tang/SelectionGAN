# code derived from PlacesCNN for scene classification Bolei Zhou
#

import sys
import torch
from torch.autograd import Variable as V
import torchvision.models as models
from torchvision import transforms as trn
from torch.nn import functional as F
import os
from PIL import Image
import numpy as np


def compute_KL_P_Q(P, Q):
    P_log = np.log(P)
    Q_log = np.log(Q)
    log_diff_mult = P * (P_log - Q_log)
    sum_along_y = np.sum(log_diff_mult,1)
    mean_value = np.mean(sum_along_y)

    scores = (np.exp(mean_value))
    std_dev = np.std(sum_along_y)
    print scores, std_dev


# architecture to use
arch = 'alexnet' #resnet50, alexnet

# load the pre-trained weights
model_weight = 'whole_%s_places365.pth.tar' % arch
if not os.access(model_weight, os.W_OK):
    weight_url = 'http://places2.csail.mit.edu/models_places365/whole_%s_places365.pth.tar' % arch
    os.system('wget ' + weight_url)

useGPU = 0
if useGPU == 1:
    model = torch.load(model_weight)
else:
    model = torch.load(model_weight, map_location=lambda storage, loc: storage) # model trained in GPU could be deployed in CPU machine like this!

model.eval()

centre_crop = trn.Compose([
        trn.Scale(256),
        trn.CenterCrop(224),
        trn.ToTensor(),
        trn.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# load the class label
file_name = 'categories_places365.txt'
if not os.access(file_name, os.W_OK):
    synset_url = 'https://raw.githubusercontent.com/csailvision/places365/master/categories_places365.txt'
    os.system('wget ' + synset_url)
classes = list()
with open(file_name) as class_file:
    for line in class_file:
        classes.append(line.strip().split(' ')[0][3:])
classes = tuple(classes)


# load the test image

img_real =sys.argv[1]
img_synthesized =sys.argv[2]

path, root, files = os.walk(img_synthesized).next()
n = len(files)
print n

p_y_x_real = np.ndarray((n, 365), )
p_y_x_synthesized = np.ndarray((n, 365), )

x = []
for i in range(n):
    img_name = files[i]
    
    img_path_real =  img_real + '/' + img_name
    img_path_synthesized =  img_synthesized + '/' + img_name
    
    im_real = Image.open(img_path_real)
    im_synthesized = Image.open(img_path_synthesized)
   
    input_img_real = V(centre_crop(im_real).unsqueeze(0), volatile=True)
    input_img_synthesized = V(centre_crop(im_synthesized).unsqueeze(0), volatile=True)

    logit_real = model.forward(input_img_real)
    h_x_real = F.softmax(logit_real).data.squeeze()
    p_y_x_real[i] = h_x_real.numpy()


    # forward pass
    logit_synthesized = model.forward(input_img_synthesized)
    h_x_synthesized = F.softmax(logit_synthesized).data.squeeze()
    p_y_x_synthesized[i] = h_x_synthesized.numpy()

    if(i%500==0):
        print i

print "\nKL between model and data: "
compute_KL_P_Q(p_y_x_synthesized, p_y_x_real)

####################################################################################################################################
