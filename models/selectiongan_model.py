import torch
from util.image_pool import ImagePool
from .base_model import BaseModel
from . import networks
import itertools

class SelectionGANModel(BaseModel):
    def name(self):
        return 'SelectionGANModel'

    @staticmethod
    def modify_commandline_options(parser, is_train=True):
        parser.set_defaults(pool_size=0, no_lsgan=True, norm='instance')
        parser.set_defaults(dataset_mode='aligned')
        parser.set_defaults(which_model_netG='unet_256')
        parser.add_argument('--REGULARIZATION', type=float, default=1e-6)
        if is_train:
            parser.add_argument('--lambda_L1', type=float, default=100.0, help='weight for image L1 loss')
            parser.add_argument('--lambda_L1_seg', type=float, default=1.0, help='weight for segmentaion L1 loss')
        return parser

    def initialize(self, opt):
        BaseModel.initialize(self, opt)
        self.isTrain = opt.isTrain

        # specify the training losses you want to print out. The program will call base_model.get_current_losses
        self.loss_names = ['D_G', 'L1','G','D_real','D_fake', 'D_D']

        # specify the images you want to save/display. The program will call base_model.get_current_visuals
        if self.opt.saveDisk:
            self.visual_names = ['real_A', 'fake_B', 'real_B','fake_D','real_D', 'A', 'I']
        else:
            self.visual_names = ['I1','I2','I3','I4','I5','I6','I7','I8','I9','I10','A1','A2','A3','A4','A5','A6','A7','A8','A9','A10',
                             'O1','O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10',
                             'real_A', 'fake_B', 'real_B','fake_D','real_D', 'A', 'I']

        # specify the models you want to save to the disk. The program will call base_model.save_networks and base_model.load_networks
        if self.isTrain:
            self.model_names = ['Gi','Gs','Ga','D']
        else:
            self.model_names = ['Gi','Gs','Ga']
        # load/define networks
        self.netGi = networks.define_G(6, 3, opt.ngf,
                                      opt.which_model_netG, opt.norm, not opt.no_dropout, opt.init_type, opt.init_gain, self.gpu_ids)

        self.netGs = networks.define_G(3, 3, 4,
                                      opt.which_model_netG, opt.norm, not opt.no_dropout, opt.init_type, opt.init_gain, self.gpu_ids)
        # 10: the number of attention maps
        self.netGa = networks.define_Ga(110, 10, opt.ngaf,
                                        opt.which_model_netG, opt.norm, not opt.no_dropout, opt.init_type, opt.init_gain, self.gpu_ids)

        if self.isTrain:
            use_sigmoid = opt.no_lsgan
            self.netD = networks.define_D(6, opt.ndf,
                                          opt.which_model_netD,
                                          opt.n_layers_D, opt.norm, use_sigmoid, opt.init_type, opt.init_gain, self.gpu_ids)

        if self.isTrain:
            self.fake_AB_pool = ImagePool(opt.pool_size)
            self.fake_DB_pool = ImagePool(opt.pool_size)
            self.fake_D_pool = ImagePool(opt.pool_size)
            # define loss functions
            self.criterionGAN = networks.GANLoss(use_lsgan=not opt.no_lsgan).to(self.device)
            self.criterionL1 = torch.nn.L1Loss()

            # initialize optimizers
            self.optimizers = []
            self.optimizer_G = torch.optim.Adam(itertools.chain(self.netGi.parameters(), self.netGs.parameters(), self.netGa.parameters()),
                                                lr=opt.lr, betas=(opt.beta1, 0.999))
            self.optimizer_D = torch.optim.Adam(self.netD.parameters(),
                                                lr=opt.lr, betas=(opt.beta1, 0.999))
            self.optimizers.append(self.optimizer_G)
            self.optimizers.append(self.optimizer_D)


    def set_input(self, input):
        AtoB = self.opt.which_direction == 'AtoB'
        self.real_A = input['A' if AtoB else 'B'].to(self.device)
        self.real_B = input['B' if AtoB else 'A'].to(self.device)
        self.real_C = input['C'].to(self.device)
        self.real_D = input['D'].to(self.device)
        self.image_paths = input['A_paths' if AtoB else 'B_paths']

    def forward(self):
        combine_AD=torch.cat((self.real_A, self.real_D), 1)
        # self.fake_B: the first stage image result
        self.Gi_feature, self.fake_B = self.netGi(combine_AD)
        # self.fake_D: the first stage segmantation result
        self.Gs_feature, self.fake_D = self.netGs(self.fake_B)

        feature_combine=torch.cat((self.Gi_feature, self.Gs_feature), 1)
        image_combine=torch.cat((self.real_A, self.fake_B), 1)

        # self.I1-I10: intermediate image generations
        # self.A1-A10: intermediate attention maps
        # self.O1-O10: multiplication results of intermediate generations and attention maps
        # self.A: uncertainty map
        # self.I: the second image result
        self.I1, self.I2, self.I3, self.I4, self.I5, self.I6, self.I7, self.I8, self.I9, self.I10,\
        self.A1, self.A2, self.A3, self.A4, self.A5, self.A6, self.A7, self.A8, self.A9, self.A10,\
        self.O1, self.O2, self.O3, self.O4, self.O5, self.O6, self.O7, self.O8, self.O9, self.O10,\
        self.A, self.I= self.netGa(feature_combine, image_combine)

        # self.Is: the second segmentation reuslt
        _, self.Is = self.netGs(self.I)


    def backward_D(self):
        # fake_B
        fake_AB = self.fake_AB_pool.query(torch.cat((self.real_A, self.fake_B), 1))
        pred_D_fake_AB = self.netD(fake_AB.detach())
        self.loss_pred_D_fake_AB = self.criterionGAN(pred_D_fake_AB, False)

        # fake_I
        fake_AI = self.fake_AB_pool.query(torch.cat((self.real_A, self.I), 1))
        pred_D_fake_AI = self.netD(fake_AI.detach())
        self.loss_pred_D_fake_AI = self.criterionGAN(pred_D_fake_AI, False)*4
        self.loss_D_fake = self.loss_pred_D_fake_AB + self.loss_pred_D_fake_AI

        # Real
        real_AB = torch.cat((self.real_A, self.real_B), 1)
        pred_real_AB = self.netD(real_AB)
        self.loss_pred_real_AB = self.criterionGAN(pred_real_AB, True)

        self.loss_D_real = 5 * self.loss_pred_real_AB

        # Combined loss
        self.loss_D_D = (self.loss_D_fake + self.loss_D_real) * 0.5

        self.loss_D_D.backward()

    def backward_G(self):
        # fake_B
        fake_AB = torch.cat((self.real_A, self.fake_B), 1)
        pred_D_fake_AB = self.netD(fake_AB)
        self.loss_D_fake_AB = self.criterionGAN(pred_D_fake_AB, True)

        # fake_I
        fake_AI = torch.cat((self.real_A, self.I), 1)
        pred_D_fake_AI = self.netD(fake_AI)
        self.loss_D_fake_AI = self.criterionGAN(pred_D_fake_AI, True)*4

        self.loss_D_G = self.loss_D_fake_AB + self.loss_D_fake_AI

        ## uncertainty guided pixel loss
        # fake_B
        self.loss_L1_1 = torch.mean(torch.div(torch.abs(self.fake_B-self.real_B), self.A) + torch.log(self.A)) * self.opt.lambda_L1 + self.criterionL1(self.fake_B, self.real_B) * self.opt.lambda_L1
        # I
        self.loss_L1_2 = torch.mean(torch.div(torch.abs(self.I-self.real_B), self.A) + torch.log(self.A)) * self.opt.lambda_L1*2 + self.criterionL1(self.I, self.real_B) * self.opt.lambda_L1 *2

        # fake_D
        self.loss_L1_3 = torch.mean(torch.div(torch.abs(self.fake_D - self.real_D), self.A) + torch.log(self.A)) * self.opt.lambda_L1_seg + self.criterionL1(self.fake_D, self.real_D) * self.opt.lambda_L1_seg
        # Is
        self.loss_L1_4 = torch.mean(torch.div(torch.abs(self.Is - self.real_D), self.A) + torch.log(self.A)) * self.opt.lambda_L1_seg*2 + self.criterionL1(self.Is, self.real_D) * self.opt.lambda_L1_seg*2
        
        # Combined loss
        self.loss_L1 = self.loss_L1_1 + self.loss_L1_2 + self.loss_L1_3 + self.loss_L1_4

        ## tv loss
        self.loss_reg = self.opt.REGULARIZATION * (
                torch.sum(torch.abs(self.I[:, :, :, :-1] - self.I[:, :, :, 1:])) +
                torch.sum(torch.abs(self.I[:, :, :-1, :] - self.I[:, :, 1:, :])))

        self.loss_G = self.loss_D_G + self.loss_L1 + self.loss_reg

        self.loss_G.backward()

    def optimize_parameters(self):
        self.forward()
        # update D
        self.set_requires_grad(self.netD, True)
        self.optimizer_D.zero_grad()
        self.backward_D()
        self.optimizer_D.step()

        # update G
        self.set_requires_grad(self.netD, False)
        self.optimizer_G.zero_grad()
        self.backward_G()
        self.optimizer_G.step()
