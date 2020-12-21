export CUDA_VISIBLE_DEVICES=0;
python train.py --name pix2pixhd_gI2I_sva --dataset_mode custom --image_dir ./SelectionGAN/selectiongan_v1/datasets/sva/train --netG pix2pixhd --niter 10 --niter_decay 10 --gpu_ids 0 --checkpoints_dir ./checkpoints --batchSize 32 --save_epoch_freq 10 --save_latest_freq 1000 --label_nc 3 --no_instance --load_size 256 --crop_size 256 --use_vae 
# --continue_train

