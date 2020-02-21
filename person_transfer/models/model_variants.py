import torch.nn as nn
import functools
import torch
import functools
import torch.nn.functional as F


class PATBlock(nn.Module):
    def __init__(self, dim, padding_type, norm_layer, use_dropout, use_bias, cated_stream2=False):
        super(PATBlock, self).__init__()
        self.conv_block_stream1 = self.build_conv_block(dim, padding_type, norm_layer, use_dropout, use_bias, cal_att=False)
        self.conv_block_stream2 = self.build_conv_block(dim, padding_type, norm_layer, use_dropout, use_bias, cal_att=True, cated_stream2=cated_stream2)

    def build_conv_block(self, dim, padding_type, norm_layer, use_dropout, use_bias, cated_stream2=False, cal_att=False):
        conv_block = []
        p = 0
        if padding_type == 'reflect':
            conv_block += [nn.ReflectionPad2d(1)]
        elif padding_type == 'replicate':
            conv_block += [nn.ReplicationPad2d(1)]
        elif padding_type == 'zero':
            p = 1
        else:
            raise NotImplementedError('padding [%s] is not implemented' % padding_type)

        if cated_stream2:
            conv_block += [nn.Conv2d(dim*2, dim*2, kernel_size=3, padding=p, bias=use_bias),
                       norm_layer(dim*2),
                       nn.ReLU(True)]
        else:
            conv_block += [nn.Conv2d(dim, dim, kernel_size=3, padding=p, bias=use_bias),
                           norm_layer(dim),
                           nn.ReLU(True)]
        if use_dropout:
            conv_block += [nn.Dropout(0.5)]

        p = 0
        if padding_type == 'reflect':
            conv_block += [nn.ReflectionPad2d(1)]
        elif padding_type == 'replicate':
            conv_block += [nn.ReplicationPad2d(1)]
        elif padding_type == 'zero':
            p = 1
        else:
            raise NotImplementedError('padding [%s] is not implemented' % padding_type)

        if cal_att:
            if cated_stream2:
                conv_block += [nn.Conv2d(dim*2, dim, kernel_size=3, padding=p, bias=use_bias)]
            else:
                conv_block += [nn.Conv2d(dim, dim, kernel_size=3, padding=p, bias=use_bias)]
        else:
            conv_block += [nn.Conv2d(dim, dim, kernel_size=3, padding=p, bias=use_bias),
                       norm_layer(dim)]

        return nn.Sequential(*conv_block)

    def forward(self, x1, x2):
        # change here
        x1_out = self.conv_block_stream1(x1)
        x2_out = self.conv_block_stream2(x2)
        # att = F.sigmoid(x2_out)
        att = torch.sigmoid(x2_out)

        x1_out = x1_out * att
        out = x1 + x1_out # residual connection

        # stream2 receive feedback from stream1
        x2_out = torch.cat((x2_out, out), 1)
        return out, x2_out, x1_out

class PATNModel(nn.Module):
    def __init__(self, input_nc, output_nc, ngf=64, norm_layer=nn.BatchNorm2d, use_dropout=False, n_blocks=6, gpu_ids=[], padding_type='reflect', n_downsampling=2):
        assert(n_blocks >= 0 and type(input_nc) == list)
        super(PATNModel, self).__init__()
        self.input_nc_s1 = input_nc[0]
        self.input_nc_s2 = input_nc[1]
        self.output_nc = output_nc
        self.ngf = ngf
        self.gpu_ids = gpu_ids
        if type(norm_layer) == functools.partial:
            use_bias = norm_layer.func == nn.InstanceNorm2d
        else:
            use_bias = norm_layer == nn.InstanceNorm2d

        # down_sample
        model_stream1_down = [nn.ReflectionPad2d(3),
                    nn.Conv2d(self.input_nc_s1, ngf, kernel_size=7, padding=0,
                           bias=use_bias),
                    norm_layer(ngf),
                    nn.ReLU(True)]

        model_stream2_down = [nn.ReflectionPad2d(3),
                    nn.Conv2d(self.input_nc_s2, ngf, kernel_size=7, padding=0,
                           bias=use_bias),
                    norm_layer(ngf),
                    nn.ReLU(True)]

        # n_downsampling = 2
        for i in range(n_downsampling):
            mult = 2**i
            model_stream1_down += [nn.Conv2d(ngf * mult, ngf * mult * 2, kernel_size=3,
                                stride=2, padding=1, bias=use_bias),
                            norm_layer(ngf * mult * 2),
                            nn.ReLU(True)]
            model_stream2_down += [nn.Conv2d(ngf * mult, ngf * mult * 2, kernel_size=3,
                                stride=2, padding=1, bias=use_bias),
                            norm_layer(ngf * mult * 2),
                            nn.ReLU(True)]

        # att_block in place of res_block
        mult = 2**n_downsampling
        cated_stream2 = [True for i in range(n_blocks)]
        cated_stream2[0] = False
        attBlock = nn.ModuleList()
        for i in range(n_blocks):
            attBlock.append(PATBlock(ngf * mult, padding_type=padding_type, norm_layer=norm_layer, use_dropout=use_dropout, use_bias=use_bias, cated_stream2=cated_stream2[i]))

        # up_sample
        model_stream1_up = []
        for i in range(n_downsampling):
            mult = 2**(n_downsampling - i)
            model_stream1_up += [nn.ConvTranspose2d(ngf * mult, int(ngf * mult / 2),
                                         kernel_size=3, stride=2,
                                         padding=1, output_padding=1,
                                         bias=use_bias),
                            norm_layer(int(ngf * mult / 2)),
                            nn.ReLU(True)]

        model_stream1_up2 = []
        model_stream1_up2 += [nn.ReflectionPad2d(3)]
        model_stream1_up2 += [nn.Conv2d(ngf, output_nc, kernel_size=7, padding=0)]
        model_stream1_up2 += [nn.Tanh()]

        # self.model = nn.Sequential(*model)
        self.stream1_down = nn.Sequential(*model_stream1_down)
        self.stream2_down = nn.Sequential(*model_stream2_down)
        # self.att = nn.Sequential(*attBlock)
        self.att = attBlock
        self.stream1_up = nn.Sequential(*model_stream1_up)
        self.stream1_up2 = nn.Sequential(*model_stream1_up2)

    def forward(self, input): # x from stream 1 and stream 2
        # here x should be a tuple
        x1, x2 = input
        # down_sample
        x1 = self.stream1_down(x1)
        x2 = self.stream2_down(x2)
        # att_block
        for model in self.att:
            x1, x2, _ = model(x1, x2)

        # up_sample
        feature = self.stream1_up(x1)
        x1 = self.stream1_up2(feature)
        # print('feature', feature.size())　[32, 64, 128, 64]
        # print('x1', x1.size()) [32, 3, 128, 64]
        return x1, feature

class SelectionGANModel(nn.Module):
    def __init__(self, input_nc, output_nc, ngf=64, norm_layer=nn.BatchNorm2d, use_dropout=False, n_blocks=6, gpu_ids=[], padding_type='reflect', n_downsampling=2):
        assert(n_blocks >= 0 and type(input_nc) == list)
        super(SelectionGANModel, self).__init__()
        self.input_nc_s1 = input_nc[0]
        self.input_nc_s2 = input_nc[1]
        self.output_nc = output_nc
        self.ngf = ngf
        self.gpu_ids = gpu_ids

        self.pool1 = nn.AvgPool2d(kernel_size=(1, 1))
        self.pool2 = nn.AvgPool2d(kernel_size=(4, 4))
        self.pool3 = nn.AvgPool2d(kernel_size=(9, 9))

        self.conv106 = nn.Conv2d(106*4, 106, kernel_size=3, stride=1, padding=1, bias=nn.InstanceNorm2d)
        self.model_attention = nn.Conv2d(106, 10, kernel_size=1, stride=1, padding=0)
        self.model_image = nn.Conv2d(106, 30, kernel_size=3, stride=1, padding=1)

        self.tanh = torch.nn.Tanh()
        self.convolution_for_attention = torch.nn.Conv2d(10, 1, 1, stride=1, padding=0)
    def forward(self, input): # x from stream 1 and stream 2
        # input: [32, 106, 128, 64]

        pool_feature1 = self.pool1(input)
        pool_feature2 = self.pool2(input)
        pool_feature3 = self.pool3(input)

        b, c, h, w = input.size()

        pool_feature1_up = F.upsample(input=pool_feature1, size=(h, w), mode='bilinear', align_corners=True)
        pool_feature2_up = F.upsample(input=pool_feature2, size=(h, w), mode='bilinear', align_corners=True)
        pool_feature3_up = F.upsample(input=pool_feature3, size=(h, w), mode='bilinear', align_corners=True)

        f1 = input * pool_feature1_up
        f2 = input * pool_feature2_up
        f3 = input * pool_feature3_up

        feature_image_combine = torch.cat((f1, f2, f3, input), 1) # feature_image_combine: 106*4
        feature_image_combine = self.conv106(feature_image_combine) # feature_image_combine: 106

        attention = self.model_attention(feature_image_combine) # attention: 10
        image = self.model_image(feature_image_combine) # image: 30

        softmax_ = torch.nn.Softmax(dim=1)
        attention = softmax_(attention)
        attention1_ = attention[:, 0:1, :, :]
        attention2_ = attention[:, 1:2, :, :]
        attention3_ = attention[:, 2:3, :, :]
        attention4_ = attention[:, 3:4, :, :]
        attention5_ = attention[:, 4:5, :, :]
        attention6_ = attention[:, 5:6, :, :]
        attention7_ = attention[:, 6:7, :, :]
        attention8_ = attention[:, 7:8, :, :]
        attention9_ = attention[:, 8:9, :, :]
        attention10_ = attention[:, 9:10, :, :]

        attention1 = attention1_.repeat(1, 3, 1, 1)
        attention2 = attention2_.repeat(1, 3, 1, 1)
        attention3 = attention3_.repeat(1, 3, 1, 1)
        attention4 = attention4_.repeat(1, 3, 1, 1)
        attention5 = attention5_.repeat(1, 3, 1, 1)
        attention6 = attention6_.repeat(1, 3, 1, 1)
        attention7 = attention7_.repeat(1, 3, 1, 1)
        attention8 = attention8_.repeat(1, 3, 1, 1)
        attention9 = attention9_.repeat(1, 3, 1, 1)
        attention10 = attention10_.repeat(1, 3, 1, 1)

        image = self.tanh(image)
        image1 = image[:, 0:3, :, :]
        image2 = image[:, 3:6, :, :]
        image3 = image[:, 6:9, :, :]
        image4 = image[:, 9:12, :, :]
        image5 = image[:, 12:15, :, :]
        image6 = image[:, 15:18, :, :]
        image7 = image[:, 18:21, :, :]
        image8 = image[:, 21:24, :, :]
        image9 = image[:, 24:27, :, :]
        image10 = image[:, 27:30, :, :]

        output1 = image1 * attention1
        output2 = image2 * attention2
        output3 = image3 * attention3
        output4 = image4 * attention4
        output5 = image5 * attention5
        output6 = image6 * attention6
        output7 = image7 * attention7
        output8 = image8 * attention8
        output9 = image9 * attention9
        output10 = image10 * attention10
        output10 = image10 * attention10

        final = output1 + output2 + output3 + output4 + output5 + output6 + output7 + output8 + output9 + output10
        # print('final', final.size()) [32, 3, 128, 64]

        sigmoid_ = torch.nn.Sigmoid()
        uncertainty = self.convolution_for_attention(attention)

        uncertainty = sigmoid_(uncertainty)
        uncertainty_map = uncertainty.repeat(1, 3, 1, 1)

        return final, uncertainty_map


class PATNetwork(nn.Module):
    def __init__(self, input_nc, output_nc, ngf=64, norm_layer=nn.BatchNorm2d, use_dropout=False, n_blocks=6, gpu_ids=[], padding_type='reflect', n_downsampling=2):
        super(PATNetwork, self).__init__()
        assert type(input_nc) == list and len(input_nc) == 2, 'The AttModule take input_nc in format of list only!!'
        self.gpu_ids = gpu_ids
        self.model = PATNModel(input_nc, output_nc, ngf, norm_layer, use_dropout, n_blocks, gpu_ids, padding_type, n_downsampling=n_downsampling)

    def forward(self, input):
        if self.gpu_ids and isinstance(input[0].data, torch.cuda.FloatTensor):
            return nn.parallel.data_parallel(self.model, input, self.gpu_ids)
        else:
            return self.model(input)

class SelectionGANNetwork(nn.Module):
    def __init__(self, input_nc, output_nc, ngf=64, norm_layer=nn.BatchNorm2d, use_dropout=False, n_blocks=6, gpu_ids=[], padding_type='reflect', n_downsampling=2):
        super(SelectionGANNetwork, self).__init__()
        # assert type(input_nc) == list and len(input_nc) == 2, 'The AttModule take input_nc in format of list only!!'
        self.gpu_ids = gpu_ids
        self.model = SelectionGANModel(input_nc, output_nc, ngf, norm_layer, use_dropout, n_blocks, gpu_ids, padding_type, n_downsampling=n_downsampling)

    def forward(self, input):
        if self.gpu_ids and isinstance(input[0].data, torch.cuda.FloatTensor):
            return nn.parallel.data_parallel(self.model, input, self.gpu_ids)
        else:
            return self.model(input)






