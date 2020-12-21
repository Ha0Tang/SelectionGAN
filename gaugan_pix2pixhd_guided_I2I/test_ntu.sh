export CUDA_VISIBLE_DEVICES=4;
python test.py --name gaugan_gI2I_ntu --dataset_mode custom --image_dir ./GestureGAN/datasets/ntu/test --gpu_ids 0 --batchSize 24 --label_nc 3 --no_instance --load_size 256 --crop_size 256 --checkpoints_dir ./checkpoints --use_vae --how_many 1000000000
