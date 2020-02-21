# Person Image Generation
Code for person image generation. This is Pytorch implementation for pose transfer on both Market1501 and DeepFashion dataset.

## Requirement
* pytorch 1.0.1
* torchvision
* dominate
* Others

## Getting Started
### Installation

- Clone this repo:
```bash
git clone 
```

### Data Preperation

We use [OpenPose](https://github.com/ZheC/Realtime_Multi-Person_Pose_Estimation) to generate keypoints. We also provide the images for convience.

#### Market1501
```bash
python
```

#### DeepFashion
```bash
python
```

### Train a model
Market-1501
```bash
sh train_market.sh
```

DeepFashion
```bash
sh train_fashion.sh
```

### Test the model
Market1501
```bash
sh test_market.sh
```

DeepFashion
```bash
sh test_fashion.sh
```

### Evaluation
We adopt SSIM, mask-SSIM, IS, mask-IS, and PCKh for evaluation of Market-1501. SSIM, IS, DS, PCKh for DeepFashion.

### Pre-trained model 
