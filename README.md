[![License CC BY-NC-SA 4.0](https://img.shields.io/badge/license-CC4.0-blue.svg)](https://raw.githubusercontent.com/nvlabs/SPADE/master/LICENSE.md)
![Python 3.6](https://img.shields.io/badge/python-3.6-green.svg)

![SelectionGAN Framework](./imgs/supp_dayton_a2g.jpg)

# SelectionGAN for Cross-View Image Translation (Coming Soon)

## SelectionGAN Framework
![SelectionGAN Framework](./imgs/framework.jpg)

## Multi-Channel Attention Selection Module
![Selection Module](./imgs/method.jpg)

### [Project page](http://disi.unitn.it/~hao.tang/project/SelectionGAN.html) |   [Paper](https://arxiv.org/abs/1903.072) | [Presentation slide](Presentation) | [Poster](Poster)

Multi-Channel Attention Selection GAN with Cascaded Semantic Guidancefor Cross-View Image Translation.<br>
[Hao Tang*](http://disi.unitn.it/~hao.tang/),  [Dan Xu*](http://www.robots.ox.ac.uk/~danxu/), [Nicu Sebe](http://disi.unitn.it/~sebe/), [Yanzhi Wang](https://ywang393.expressions.syr.edu/), [Jason J. Corso](http://web.eecs.umich.edu/~jjcorso/) and [Yan Yan](https://userweb.cs.txstate.edu/~y_y34/). (* Equal Contribution.)<br> 
In [CVPR 2019](http://cvpr2019.thecvf.com/) (Oral).

### [License](./LICENSE.md)

Copyright (C) 2019 University of Trento.

All rights reserved.
Licensed under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode) (**Attribution-NonCommercial-ShareAlike 4.0 International**)

The code is released for academic research use only. For commercial use, please contact [hao.tang@unitn.it](hao.tang@unitn.it).

## Installation

Clone this repo.
```bash
git clone https://github.com/Ha0Tang/SelectionGAN
cd SelectionGAN/
```

This code requires PyTorch 0.4.1 and python 3.6+. Please install dependencies by
```bash
pip install -r requirements.txt (for pip users)
```
or 

```bash
./scripts/conda_deps.sh (for Conda users)
```

To reproduce the results reported in the paper, you would need an NVIDIA GeForce GTX 1080 Ti GPU with 11GB memory.

## Dataset Preparation

For Dayton, CVUSA or Ego2Top, the datasets must be downloaded beforehand. Please download them on the respective webpages. In addition, we put a few sample images in this [code repo](https://github.com/Ha0Tang/SelectionGAN/tree/master/datasets/samples).

**Preparing Dayton Dataset**. The dataset can be downloaded [here](https://github.com/lugiavn/gt-crossview). In particular, you will need to download dayton.zip. 
Ground Truth semantic maps are not available for this datasets. We adopt [RefineNet](https://github.com/guosheng/refinenet) trained on CityScapes dataset for generating semantic maps and use them as training data in our experiments. Please cite their papers if you use this dataset.
Train/Test splits for Dayton dataset can be downloaded from [here](https://github.com/Ha0Tang/SelectionGAN/tree/master/datasets/dayton_split).


**Preparing CVUSA Dataset**. The dataset can be downloaded [here](https://drive.google.com/drive/folders/0BzvmHzyo_zCAX3I4VG1mWnhmcGc), which is from the [page](http://cs.uky.edu/~jacobs/datasets/cvusa/). After unzipping the dataset, prepare the training and testing data as discussed in [our paper](https://arxiv.org/abs/1903.072). We also convert semantic maps to the color ones by using this [script](https://github.com/Ha0Tang/SelectionGAN/blob/master/scripts/convert_sematic_map_dayton.txt).
Since there is no semantic maps for the aerial images on this dataset, we use black images as aerial semantic maps for placehold purposes.

**Preparing Ego2Top Dataset**. The dataset can be downloaded [here](https://www.dropbox.com/sh/bm5g0lzat60td6q/AABQYt-EsIae9ChVR--0Zvo8a?dl=0), which is from this [paper](https://sites.google.com/view/shervinardeshir). We further adopt [this tool](https://github.com/CSAILVision/semantic-segmentation-pytorch) to generate the sematic maps for training. The trianing and testing splits can be downloaded [here](placehold). 

**Preparing New Dataset**. Each training sample in the dataset will contain {Ig,Ia,Sg,Sa}, where Ig=ground image, Ia=aerial image, Sg=semantic map for ground image, and Sa=semantic map for aerial image.
Of course, you can use SelectionGAN for another generative tasks.

## Generating Images Using Pretrained Model

Once the dataset is ready. The result images can be generated using pretrained models.

1. Download the tar of the pretrained models from the [Google Drive Folder](placehold), save it in 'checkpoints/', and run

    ```
    cd checkpoints
    tar xvf checkpoints.tar.gz
    cd ../
    ```

2. Generate images using the pretrained model.
    ```bash
    python test.py --dataroot [path_to_dataset] --name type]_pretrained --model SelectionGAN --which_model_netG unet_256 --which_direction AtoB --dataset_mode aligned --norm batch --gpu_ids 0 --batchSize [BS] --loadSize [LS] --fineSize [FS] --no_flip --eval;
    ```
    `[path_to_dataset]`, is the path to the dataset. Dataset can be one of `dayton`, `cvusa`, and `ego2top`. `[type]_pretrained` is the directory name of the checkpoint file downloaded in Step 1, which should be one of `dayton_a2g_64_pretrained`, `dayton_g2a_64_pretrained`, `dayton_a2g_256_pretrained`, `dayton_g2a_256_pretrained`, `cvusa_pretrained`,and `ego2top_pretrained`. If you are running on CPU mode, change `--gpu_ids -0` to `--gpu_ids -1`. For [`BS`, `LS`, `FS`],
    
- `dayton_a2g_64_pretrained`: [16,72,64]
- `dayton_g2a_64_pretrained`: [16,72,64]
- `dayton_g2a_256_pretrained`: [4,286,256]
- `dayton_g2a_256_pretrained`: [4,286,256]
- `cvusa_pretrained`: [4,286,256]
- `ego2top_pretrained`: [8,286,256]
    

3. The outputs images are stored at `./results/[type]_pretrained/` by default. You can view them using the autogenerated HTML file in the directory.

## Training New Models

New models can be trained with the following commands.

1. Prepare dataset. 

2. Train.

```bash
# To train on the dayton dataset on 64*64 resolution,

python train.py --dataroot [path_to_dayton_dataset] --name [experiment_name] --model SelectionGAN --which_model_netG unet_256 --which_direction AtoB --dataset_mode aligned --norm batch --gpu_ids 0 --batchSize 16 --niter 50 --niter_decay 50 --loadSize 72 --fineSize 64 --no_flip --lambda_L1 100 --lambda_L1_seg 1 --display_winsize 64 --display_id 1
```
```bash
# To train on the datasets on 256*256 resolution,

python train.py --dataroot [path_to_dataset] --name [experiment_name] --model SelectionGAN --which_model_netG unet_256 --which_direction AtoB --dataset_mode aligned --norm batch --gpu_ids 0 --batchSize [BS] --loadSize [LS] --fineSize [FS] --no_flip --display_id 0 --lambda_L1 100 --lambda_L1_seg 1
```
- For dayton dataset, [`BS`,`LS`,`FS`]=[4,286,256], append `--niter 20 --niter_decay 15`.
- For cvusa dataset, [`BS`,`LS`,`FS`]=[4,286,256], append `--niter 15 --niter_decay 15`.
- For ego2top dataset, [`BS`,`LS`,`FS`]=[8,286,256], append `--niter 5 --niter_decay 5`.


There are many options you can specify. Please use `python train.py --help`. The specified options are printed to the console. To specify the number of GPUs to utilize, use `export CUDA_VISIBLE_DEVICES=[GPU_ID]`. 

To view training results and loss plots, run `python -m visdom.server` on a new terminal and click the URL [http://localhost:8097](http://localhost:8097/).

## Testing

Testing is similar to testing pretrained models.

```bash
python test.py --dataroot [path_to_dataset] --name type]_pretrained --model SelectionGAN --which_model_netG unet_256 --which_direction AtoB --dataset_mode aligned --norm batch --gpu_ids 0 --batchSize [BS] --loadSize [LS] --fineSize [FS] --no_flip --eval;
```

Use `--how_many` to specify the maximum number of images to generate. By default, it loads the latest checkpoint. It can be changed using `--which_epoch`.

## Code Structure

- `train.py`, `test.py`: the entry point for training and testing.
- `models/selectiongan_model.py`: creates the networks, and compute the losses
- `models/networks/`: defines the architecture of all models for selectiongan
- `options/`: creates option lists using `argparse` package. More individuals are dynamically added in other files as well. Please see the section below.
- `data/`: defines the class for loading images and semantic maps.

## Evaluation

We use several metrics to evaluate the generated images by SelectionGAN.

- Inception Score: [IS](https://github.com/Ha0Tang/SelectionGAN/blob/master/scripts/evaluation/compute_topK_KL.py), need install `python 2.7`
- Top-k prediction accuracy: [Acc](https://github.com/Ha0Tang/SelectionGAN/blob/master/scripts/evaluation/compute_accuracies.py), need install `python 2.7`
- KL score: [KL](https://github.com/Ha0Tang/SelectionGAN/blob/master/scripts/evaluation/KL_model_data.py), need install `python 2.7`
- Structural-Similarity: [SSIM](https://github.com/Ha0Tang/SelectionGAN/blob/master/scripts/evaluation/compute_ssim_psnr_sharpness.lua), need install `Lua`
- Peak Signal-to-Noise Radio: [PSNR](https://github.com/Ha0Tang/SelectionGAN/blob/master/scripts/evaluation/compute_ssim_psnr_sharpness.lua), nedd install 'Lua'
- Sharpness Difference: [SD](https://github.com/Ha0Tang/SelectionGAN/blob/master/scripts/evaluation/compute_ssim_psnr_sharpness.lua), need install `Lua`


### Citation
If you use this code for your research, please cite our papers.
```
@inproceedings{tang2019multichannel,
  title={Multi-Channel Attention Selection GAN with Cascaded Semantic Guidancefor Cross-View Image Translation},
  author={Tang, Hao and Xu, Dan and Sebe, Nicu and Wang, Yanzhi and Corso, Jason J. and Yan, Yan},
  booktitle={CVPR},
  year={2019}
}

```

## Acknowledgments
This code borrows heavily from [Pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix). This research was partially supported by National Institute of Standards and Technology Grant 60NANB17D191 (YY, JC), Army Research Office W911NF-15-1-0354 (JC) and gift donation from Cisco Inc (YY).

## Contributions/Comments
If you have any questions/comments/bug reports, feel free to open a github issue or pull a request or e-mail to the author Hao Tang ([hao.tang@unitn.it](hao.tang@unitn.it)).