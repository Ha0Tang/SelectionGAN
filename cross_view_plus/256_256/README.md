This code aims to handle cross-view image translation task with the combination of RGB images and target semantic maps as inputs.
The code is borrowed from [pix2pix](https://github.com/phillipi/pix2pix) and [X-Fork & X-Seq](https://github.com/kregmi/cross-view-image-synthesis). 

## Setup

### Getting Started
- Install torch and dependencies from https://github.com/torch/distro
- Install torch packages `nngraph` and `display`
```bash
luarocks install nngraph
luarocks install https://raw.githubusercontent.com/szym/display/master/display-scm-0.rockspec
```
- Clone this repo:
```bash
git clone https://github.com/Ha0Tang/SelectionGAN
cd Pix2pix_X-Fork_X-Seq_PLUS
cd 256_256
```

## Training and Testing
### Datasets
Download datasets.

### Pix2pix++ Train/Test
```bash
export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/sva name=sva_pix2pix_plus which_direction=g2a phase=train niter=xxx th train_pix2pix.lua;
DATA_ROOT=./datasets/sva name=sva_pix2pix_plus which_direction=g2a phase=test which_epoch=xxx th test_pix2pix.lua;
```
- for sva: xxx = 20
- for dayton: xxx = 35
- for ego2top: xxx = 10
- for cvusa: xxx = 30

### X-Fork++ Train/Test
```bash
export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/dayton name=dayton_g2a_fork_plus which_direction=a2g phase=train niter=35 th train_fork.lua;
DATA_ROOT=./datasets/dayton name=dayton_g2a_fork_plus which_direction=a2g phase=test which_epoch=35 th test_fork.lua;

export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/dayton name=dayton_a2g_fork_plus which_direction=g2a phase=train niter=35 th train_fork.lua;
DATA_ROOT=./datasets/dayton name=dayton_a2g_fork_plus which_direction=g2a phase=test which_epoch=35 th test_fork.lua;

export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/sva name=sva_fork_plus which_direction=g2a phase=train niter=20 th train_fork.lua;
DATA_ROOT=./datasets/sva name=sva_fork_plus which_direction=g2a phase=test which_epoch=20 th test_fork.lua;
```

### X-Seq++ Train/Test
```bash
export CUDA_VISIBLE_DEVICES=0;
DATA_ROOT=./datasets/dayton name=dayton_g2a_seq_plus which_direction=a2g phase=train niter=35 th train_seq.lua;
DATA_ROOT=./datasets/dayton name=dayton_g2a_seq_plus which_direction=a2g phase=test which_epoch=35 th test_seq.lua;

export CUDA_VISIBLE_DEVICES=0;
DATA_ROOT=./datasets/sva name=sva_seq_plus which_direction=g2a phase=train niter=20 th train_seq.lua;
DATA_ROOT=./datasets/sva name=sva_seq_plus which_direction=g2a phase=test which_epoch=20 th test_seq.lua;
```

### Pretrained Models
Pretrained models can be downloaded by using:
```
bash ./scripts/download_plus_model.sh [dataset_name]_[model_name]_plus
```
- `[dataset_name]`: cvusa, sva, ego2top, dayton_a2g, dayton_g2a
- `[model_name]`: pix2pix, seq, fork
