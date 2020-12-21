FILE=$1

echo "Note: available models are gaugan_ntu, gaugan_rafd, gaugan_sva, pix2pixhd_ntu, pix2pixhd_rafd, pix2pixhd_sva"
echo "Specified [$FILE]"

URL=http://disi.unitn.it/~hao.tang/uploads/models/SelectionGAN/${FILE}_pretrained.tar.gz
TAR_FILE=./checkpoints/${FILE}_pretrained.tar.gz
TARGET_DIR=./checkpoints/${FILE}_pretrained/

wget -N $URL -O $TAR_FILE

mkdir -p $TARGET_DIR
tar -zxvf $TAR_FILE -C ./checkpoints/
rm $TAR_FILE
