import os
from shutil import copyfile
from PIL import Image

# path for downloaded fashion images
root_fashion_dir = '/mnt/data4/htang/Pose-Transfer/fashion/Img/DeepFashion'
assert len(root_fashion_dir) > 0, 'please give the path of raw deep fashion dataset!'

# print(len(root_fashion_dir) )

train_images = []
train_f = open('fashion_data/train.lst', 'r')
for lines in train_f:
 	lines = lines.strip()
 	if lines.endswith('.jpg'):
 		train_images.append(lines)
 		# print(train_images)

test_images = []
test_f = open('fashion_data/test.lst', 'r')
for lines in test_f:
	lines = lines.strip()
	if lines.endswith('.jpg'):
		test_images.append(lines)

train_path = 'fashion_data/train'
if not os.path.exists(train_path):
	os.mkdir(train_path)

for item in train_images:
	from_ = os.path.join(root_fashion_dir, item)
	img = Image.open(from_)
	imgcrop = img.crop((40, 0, 216, 256))
	to_ = os.path.join(train_path, item)
	imgcrop.save(to_)
	#copyfile(from_, to_)


test_path = 'fashion_data/test'
if not os.path.exists(test_path):
	os.mkdir(test_path)

for item in test_images:
	from_ = os.path.join(root_fashion_dir, item)
	img = Image.open(from_)
	imgcrop = img.crop((40, 0, 216, 256))
	to_ = os.path.join(test_path, item)
	# os.system('cp %s %s' %(from_, to_))
	#copyfile(from_, to_)
	imgcrop.save(to_)
