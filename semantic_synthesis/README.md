## Installation

Clone this repo.
```bash
git clone https://github.com/Ha0Tang/SelectionGAN
cd SelectionGAN/
cd semantic_synthesis/
```

This code requires PyTorch 1.0 and python 3+. Please install dependencies by
```bash
pip install -r requirements.txt
```

This code also requires the Synchronized-BatchNorm-PyTorch rep.
```
cd models/networks/
git clone https://github.com/vacancy/Synchronized-BatchNorm-PyTorch
cp -rf Synchronized-BatchNorm-PyTorch/sync_batchnorm .
cd ../../
```

To reproduce the results reported in the paper, you would need an NVIDIA DGX1 machine with 8 V100 GPUs.

## Dataset Preparation
Follow [GauGAN](https://github.com/NVlabs/SPADE) for more details.

## Generating Images Using Pretrained Model

## Training New Models

New models can be trained with the following commands.

1. Prepare dataset. 
2. Train.

```bash
sh run.sh
```

## Testing

Testing is similar to testing pretrained models.

```bash
python test.py --name ade_selectiongan --dataset_mode ade20k --dataroot ./datasets/ADEChallengeData2016 --gpu_ids 0 --results_dir ./results --checkpoints_dir ./checkpoints --batchSize 1 --which_epoch latest;
```

Use `--results_dir` to specify the output directory. `--how_many` will specify the maximum number of images to generate. By default, it loads the latest checkpoint. It can be changed using `--which_epoch`.
