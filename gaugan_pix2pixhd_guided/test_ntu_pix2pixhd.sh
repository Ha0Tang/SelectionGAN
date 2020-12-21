export CUDA_VISIBLE_DEVICES=7;
python test.py --name pix2pixhd_ntu --dataset_mode custom --image_dir ./GestureGAN/datasets/ntu/test --gpu_ids 0 --netG pix2pixhd  --batchSize 24 --label_nc 3 --no_instance --load_size 256 --crop_size 256 --checkpoints_dir ./checkpoints --use_vae --how_many 1000000000
