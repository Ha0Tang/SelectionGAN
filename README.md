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
    python test.py --dataroot [path_to_dataset]  --name type]_pretrained --model pix2pix --which_model_netG unet_256 --which_direction AtoB --dataset_mode aligned --norm batch --gpu_ids 0 --batchSize [A] --loadSize [B] --fineSize [C] --no_flip --eval;
    ```
    `[type]_pretrained` is the directory name of the checkpoint file downloaded in Step 1, which should be one of `coco_pretrained`, `ade20k_pretrained`, and `cityscapes_pretrained`. `[dataset]` can be one of `coco`, `ade20k`, and `cityscapes`, and `[path_to_dataset]`, is the path to the dataset. If you are running on CPU mode, append `--gpu_ids -1`.
    `[path_to_dataset]`, is the path to the dataset. Dataset can be one of `dayton`, `cvusa`, and `ego2top`. `[type]_pretrained` is the directory name of the checkpoint file downloaded in Step 1, which should be one of `dayton_a2g_64_pretrained`, `dayton_g2a_64_pretrained`, `dayton_a2g_256_pretrained`, `dayton_g2a_256_pretrained`, `cvusa_pretrained`,and `ego2top_pretrained`. If you are running on CPU mode, change `--gpu_ids -0` to `--gpu_ids -1`.
    

3. The outputs images are stored at `./results/[type]_pretrained/` by default. You can view them using the autogenerated HTML file in the directory.

## Training New Models

New models can be trained with the following commands.

1. Prepare dataset. To train on the datasets shown in the paper, you can download the datasets and use `--dataset_mode` option, which will choose which subclass of `BaseDataset` is loaded. For custom datasets, the easiest way is to use `./data/custom_dataset.py` by specifying the option `--dataset_mode custom`, along with `--label_dir [path_to_labels] --image_dir [path_to_images]`. You also need to specify options such as `--label_nc` for the number of label classes in the dataset, `--contain_dontcare_label` to specify whether it has an unknown label, or `--no_instance` to denote the dataset doesn't have instance maps.

2. Train.

```bash
# To train on the Facades or COCO dataset, for example.
python train.py --name [experiment_name] --dataset_mode facades --dataroot [path_to_facades_dataset]
python train.py --name [experiment_name] --dataset_mode coco --dataroot [path_to_coco_dataset]

# To train on your own custom dataset
python train.py --name [experiment_name] --dataset_mode custom --label_dir [path_to_labels] -- image_dir [path_to_images] --label_nc [num_labels]
```

There are many options you can specify. Please use `python train.py --help`. The specified options are printed to the console. To specify the number of GPUs to utilize, use `--gpu_ids`. If you want to use the second and third GPUs for example, use `--gpu_ids 1,2`.

To log training, use `--tf_log` for Tensorboard. The logs are stored at `[checkpoints_dir]/[name]/logs`.

## Testing

Testing is similar to testing pretrained models.

```bash
python test.py --name [name_of_experiment] --dataset_mode [dataset_mode] --dataroot [path_to_dataset]
```

Use `--results_dir` to specify the output directory. `--how_many` will specify the maximum number of images to generate. By default, it loads the latest checkpoint. It can be changed using `--which_epoch`.

## Code Structure

- `train.py`, `test.py`: the entry point for training and testing.
- `trainers/pix2pix_trainer.py`: harnesses and reports the progress of training.
- `models/pix2pix_model.py`: creates the networks, and compute the losses
- `models/networks/`: defines the architecture of all models
- `options/`: creates option lists using `argparse` package. More individuals are dynamically added in other files as well. Please see the section below.
- `data/`: defines the class for loading images and label maps.

## Options

This code repo contains many options. Some options belong to only one specific model, and some options have different default values depending on other options. To address this, the `BaseOption` class dynamically loads and sets options depending on what model, network, and datasets are used. This is done by calling the static method `modify_commandline_options` of various classes. It takes in the`parser` of `argparse` package and modifies the list of options. For example, since COCO-stuff dataset contains a special label "unknown", when COCO-stuff dataset is used, it sets `--contain_dontcare_label` automatically at `data/coco_dataset.py`. You can take a look at `def gather_options()` of `options/base_options.py`, or `models/network/__init__.py` to get a sense of how this works.

## Evaluation Code

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