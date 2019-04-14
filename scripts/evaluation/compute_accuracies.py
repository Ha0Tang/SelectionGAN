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

# th architecture to use
arch = 'alexnet' #resnet50, alexnet, 

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

counter_5_synthesized= 0
counter_1_synthesized = 0  

counter_5_synthesized_prob = 0
counter_1_synthesized_prob = 0  


img_num = 0
 
for i in range(n):
    img_name = files[i]
    
    img_path_real =  img_real + '/' + img_name
    img_path_synthesized =  img_synthesized + '/' + img_name

    im_real = Image.open(img_path_real)
    im_synthesized = Image.open(img_path_synthesized)
    
    input_img_real = V(centre_crop(im_real).unsqueeze(0), volatile=True)
    input_img_synthesized = V(centre_crop(im_synthesized).unsqueeze(0), volatile=True)
    

    # forward pass real data
    logit_real = model.forward(input_img_real)
    h_x_real = F.softmax(logit_real).data.squeeze()
    probs, idx = h_x_real.sort(0, True)
    class_real_img = classes[idx[0]]


    # forward pass synthesized 
    logit_synthesized = model.forward(input_img_synthesized)
    h_x_synthesized = F.softmax(logit_synthesized).data.squeeze()
    probs_synthesized, idx_synthesized = h_x_synthesized.sort(0, True)

    # accuracies for synthesized model
    if(classes[idx_synthesized[0]]== class_real_img):
        counter_1_synthesized = counter_1_synthesized + 1
    for j in range(0, 5):
       if(classes[idx_synthesized[j]]== class_real_img):
            counter_5_synthesized = counter_5_synthesized + 1

	
    # accuracies when considering confidence score value
    if (probs[0]>0.5):
    	img_num = img_num + 1
        if(classes[idx_synthesized[0]]== class_real_img):
           counter_1_synthesized_prob = counter_1_synthesized_prob + 1
        for j in range(0, 5):
           if(classes[idx_synthesized[j]]== class_real_img):
               counter_5_synthesized_prob = counter_5_synthesized_prob + 1

    if(i%500==0):
        print i

print "Total Images into consideration: " + str(i+1) 
print "Total Match Found for synthesized : " + str(counter_1_synthesized) + " for N = 1 and " + str(counter_5_synthesized) + " for N = 5"
print "\nTotal Images into consideration (with prob > 0.5): " + str(img_num) 
print "Total Match Found for synthesized : " + str(counter_1_synthesized_prob) + " for N = 1 and " + str(counter_5_synthesized_prob) + " for N = 5"
