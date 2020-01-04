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
cd cross_view_v2
cd 64_64
```

## Training and Testing
### Datasets
Download datasets.

### Pix2pix++ Train/Test
```bash
export CUDA_VISIBLE_DEVICES=0;
DATA_ROOT=./datasets/dayton name=dayton_a2g_pix2pix_plus_64 which_direction=g2a phase=train loadSize=64 fineSize=64 niter=100 th train_pix2pix.lua;
DATA_ROOT=./datasets/dayton name=dayton_a2g_pix2pix_plus_64 which_direction=g2a phase=test loadSize=64 fineSize=64 which_epoch=100 th test_pix2pix.lua;

export CUDA_VISIBLE_DEVICES=0;
DATA_ROOT=./datasets/dayton name=dayton_g2a_pix2pix_plus_64 which_direction=a2g phase=train loadSize=64 fineSize=64 niter=100 th train_pix2pix.lua;
DATA_ROOT=./datasets/dayton name=dayton_g2a_pix2pix_plus_64 which_direction=a2g phase=test loadSize=64 fineSize=64 which_epoch=100 th test_pix2pix.lua;
```

### X-Fork++ Train/Test
```bash
export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/dayton name=dayton_a2g_fork_plus_64 which_direction=g2a phase=train loadSize=64 fineSize=64 niter=100 th train_fork.lua;
DATA_ROOT=./datasets/dayton name=dayton_a2g_fork_plus_64 which_direction=g2a phase=test loadSize=64 fineSize=64 which_epoch=100 th test_fork.lua;

export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/dayton name=dayton_g2a_fork_plus_64 which_direction=a2g phase=train loadSize=64 fineSize=64 niter=100 th train_fork.lua;
DATA_ROOT=./datasets/dayton name=dayton_g2a_fork_plus_64 which_direction=a2g phase=test loadSize=64 fineSize=64 which_epoch=100 th test_fork.lua;

```

### X-Seq++ Train/Test
```bash
export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/dayton name=dayton_a2g_seq_plus_64 which_direction=g2a phase=train loadSize=64 fineSize=64 niter=100 th train_seq.lua;
DATA_ROOT=./datasets/dayton name=dayton_a2g_seq_plus_64 which_direction=g2a phase=test loadSize=64 fineSize=64 which_epoch=100 th test_seq.lua;

export CUDA_VISIBLE_DEVICES=1;
DATA_ROOT=./datasets/dayton name=dayton_g2a_seq_plus_64 which_direction=a2g phase=train loadSize=64 fineSize=64 niter=100 th train_seq.lua;
DATA_ROOT=./datasets/dayton name=dayton_g2a_seq_plus_64 which_direction=a2g phase=test loadSize=64 fineSize=64 which_epoch=100 th test_seq.lua;

```

### Pretrained Models
Pretrained models can be downloaded by using:
```
bash ./scripts/download_plus_model.sh dayton_[direction]_[model_name]_plus_64
```
- `[direction]`: a2g, g2a
- `[model_name]`: pix2pix, seq, fork

Then to generate images using (e.g., g2a_seq):
```
DATA_ROOT=./datasets/dayton name=dayton_g2a_seq_plus_64_pretrained which_direction=a2g phase=test loadSize=64 fineSize=64 which_epoch=latest th test_seq.lua;
```
