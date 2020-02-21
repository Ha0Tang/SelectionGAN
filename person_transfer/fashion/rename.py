import os
import shutil

IMG_EXTENSIONS = [
'.jpg', '.JPG', '.jpeg', '.JPEG',
'.png', '.PNG', '.ppm', '.PPM', '.bmp', '.BMP',
]

def is_image_file(filename):
    return any(filename.endswith(extension) for extension in IMG_EXTENSIONS)

def make_dataset(dir):
    images = []
    assert os.path.isdir(dir), '%s is not a valid directory' % dir
    new_root = 'DeepFashion'
    if not os.path.exists(new_root):
        os.mkdir(new_root)

    for root, _, fnames in sorted(os.walk(dir)):
        for fname in fnames:
            if is_image_file(fname):
                path = os.path.join(root, fname)
                path_names = path.split('/') 
                #path_names[2] = path_names[2].replace('_', '')
                path_names[3] = path_names[3].replace('_', '')
                path_names[4] = path_names[4].split('_')[0] + "_" + "".join(path_names[4].split('_')[1:])
                path_names = "".join(path_names)
                new_path = os.path.join(root, path_names)

                os.rename(path, new_path)
                shutil.move(new_path, os.path.join(new_root, path_names))

make_dataset('fashion')
