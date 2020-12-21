"""
Copyright (C) 2019 NVIDIA Corporation.  All rights reserved.
Licensed under the CC BY-NC-SA 4.0 license (https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode).
"""

from data.base_dataset import BaseDataset, get_params, get_transform
from PIL import Image
import util.util as util


class AlignedDataset(BaseDataset):
    @staticmethod
    def modify_commandline_options(parser, is_train):
        parser.add_argument('--no_pairing_check', action='store_true',
                            help='If specified, skip sanity check of correct label-image file pairing')
        return parser

    def initialize(self, opt):
        self.opt = opt

        image_paths = self.get_paths(opt)

        util.natural_sort(image_paths)

        image_paths = image_paths[:opt.max_dataset_size]

        self.image_paths = image_paths

        size = len(self.image_paths)
        self.dataset_size = size

    def get_paths(self, opt):
        image_paths = []
        assert False, "A subclass of AlignedDataset must override self.get_paths(self, opt)"
        return image_paths

    def __getitem__(self, index):
        # input image (real images)
        ABCD_path = self.image_paths[index]
        ABCD = Image.open(ABCD_path)
        ABCD = ABCD.convert('RGB')

        # split ABCD image into A B C D
        w, h = ABCD.size
        w2 = int(w / 4)
        A = ABCD.crop((0, 0, w2, h))
        B = ABCD.crop((w2, 0, 2 * w2, h))
        C = ABCD.crop((2 * w2, 0, 3 * w2, h))
        D = ABCD.crop((3 * w2, 0, w, h))

        params = get_params(self.opt, A.size)

        A = get_transform(self.opt, params)(A)
        B = get_transform(self.opt, params)(B)
        C = get_transform(self.opt, params)(C)
        D = get_transform(self.opt, params)(D)

        input_dict = {'cond_image': A,
                      'image': B,
                      'C': C,
                      'label': D,
                      'path': ABCD_path,
                      }

        # Give subclasses a chance to modify the final output
        self.postprocess(input_dict)

        return input_dict

    def postprocess(self, input_dict):
        return input_dict

    def __len__(self):
        return self.dataset_size
