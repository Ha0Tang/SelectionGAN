[![License CC BY-NC-SA 4.0](https://img.shields.io/badge/license-CC4.0-blue.svg)](https://github.com/Ha0Tang/SelectionGAN/blob/master/LICENSE.md)
![Python 3.6](https://img.shields.io/badge/python-3.6-green.svg)
![Packagist](https://img.shields.io/badge/Pytorch-0.4.1-red.svg)
![Last Commit](https://img.shields.io/github/last-commit/Ha0Tang/SelectionGAN)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-blue.svg)](https://github.com/Ha0Tang/SelectionGAN/graphs/commit-activity)
![Contributing](https://img.shields.io/badge/contributions-welcome-red.svg?style=flat)
![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)

# SelectionGAN for Guided Image-to-Image Translation
### [CVPR Paper](https://arxiv.org/abs/1904.06807) | [Extended Paper](https://arxiv.org/abs/2002.01048) | [Guided-I2I-Translation-Papers](https://github.com/Ha0Tang/Guided-I2I-Translation-Papers)

![SelectionGAN Results](./imgs/motivation.jpg)

## Citation
If you use this code for your research, please cite our papers.
```
@article{tang2020multi,
  title={Multi-Channel Attention Selection GANs for Guided Image-to-Image Translation},
  author={Tang, Hao and Xu, Dan and Yan, Yan and Corso, Jason J and Torr, Philip HS and Sebe, Nicu},
  journal={arXiv preprint arXiv:2002.01048},
  year={2020}
}

@inproceedings{tang2019multichannel,
  title={Multi-Channel Attention Selection GAN with Cascaded Semantic Guidance for Cross-View Image Translation},
  author={Tang, Hao and Xu, Dan and Sebe, Nicu and Wang, Yanzhi and Corso, Jason J. and Yan, Yan},
  booktitle={CVPR},
  year={2019}
}

@article{tang2020edge,
  title={Edge Guided GANs with Semantic Preserving for Semantic Image Synthesis},
  author={Tang, Hao and Qi, Xiaojuan and Xu, Dan and Torr, Philip HS and Sebe, Nicu},
  journal={arXiv preprint arXiv:2003.13898},
  year={2020}
}

@inproceedings{tang2019local,
  title={Local Class-Specific and Global Image-Level Generative Adversarial Networks for Semantic-Guided Scene Generation},
  author={Tang, Hao and Xu, Dan and Yan, Yan and Torr, Philip HS and Sebe, Nicu},
  booktitle={CVPR},
  year={2020}
}
```

In the meantime, check out our related papers:
- cross-view image translation: [Cross-View Panorama Image Synthesis](https://github.com/sswuai/PanoGAN), 
- person image generation: [XingGAN for Person Image Generation (ECCV 2020)](https://github.com/Ha0Tang/XingGAN) and [Bipartite Graph Reasoning GANs for Person Image Generation (BMVC 2020 Oral)](https://github.com/Ha0Tang/BiGraphGAN)
- semantic image synthesis: [Edge Guided GANs with Semantic Preserving for Semantic Image Synthesis](https://github.com/Ha0Tang/EdgeGAN), [Dual Attention GANs for Semantic Image Synthesis (ACM MM 2020)](https://github.com/Ha0Tang/DAGAN), and [Local Class-Specific and Global Image-Level Generative Adversarial Networks for Semantic-Guided Scene Generation (CVPR 2020)](https://github.com/Ha0Tang/LGGAN).

More related guided image-to-image translation papers can be found in [this page](https://github.com/Ha0Tang/Guided-I2I-Translation-Papers).

## To Do List
- [x] SelectionGAN: CVPR version
- [x] SelectionGAN++: TPAMI submission
- [x] Pix2pix++: Takes RGB image and target semantic map as inputs: [code](./cross_view_v2)
- [x] X-ForK++: Takes RGB image and target semantic map as inputs: [code](./cross_view_v2)
- [x] X-Seq++: Takes RGB image and target semantic map as inputs: [code](./cross_view_v2)

## Others
- [How to write a great science paper](https://www.nature.com/articles/d41586-019-02918-5)

## Acknowledgments
This source code is inspired by [Pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix).

## Contributions
If you have any questions/comments/bug reports, feel free to open a github issue or pull a request or e-mail to the author Hao Tang ([hao.tang@unitn.it](hao.tang@unitn.it)).


