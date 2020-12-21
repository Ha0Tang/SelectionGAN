export CUDA_VISIBLE_DEVICES=1;
python train.py --name pix2pixhd_gI2I_rafd --dataset_mode custom --image_dir ./SelectionGAN/selectiongan_v1/datasets/Radboud_selectiongan/train --niter 100 --niter_decay 100 --gpu_ids 0 --netG pix2pixhd --checkpoints_dir ./checkpoints --batchSize 32 --save_epoch_freq 50 --save_latest_freq 1000 --label_nc 3 --no_instance --load_size 256 --crop_size 256 --use_vae 
# --continue_train

