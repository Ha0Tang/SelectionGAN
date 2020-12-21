export CUDA_VISIBLE_DEVICES=4,7;
python train.py --name gaugan_ntu --dataset_mode custom --image_dir ./GestureGAN/datasets/ntu/train --niter 10 --niter_decay 10 --gpu_ids 0,1 --checkpoints_dir ./checkpoints --batchSize 24 --save_epoch_freq 100 --save_latest_freq 1000 --label_nc 3 --no_instance --load_size 256 --crop_size 256 --use_vae 
# --continue_train
