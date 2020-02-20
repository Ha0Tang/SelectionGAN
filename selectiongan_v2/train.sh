python train.py --dataroot ./datasets/sva \
        --name sva_selectiongan_plus \
        --model selectiongan \
        --which_model_netG unet_256 \
        --which_direction AtoB \
        --dataset_mode aligned \
        --norm batch \
        --gpu_ids 0 \
        --batchSize 4 \
        --loadSize 286 \
        --fineSize 256 \
        --no_flip \
        --display_id 0 \
        --lambda_L1 100 \
        --lambda_L1_seg 1 \
        --niter 10 --niter_decay 10 
#--continue_train --which_epoch 184 --epoch_count 185

