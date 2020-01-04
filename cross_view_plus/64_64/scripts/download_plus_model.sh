FILE=$1

echo "Note: available models are dayton_a2g_fork_plus_64, dayton_a2g_seq_plus_64, dayton_a2g_pix2pix_plus_64, dayton_g2a_fork_plus_64, dayton_g2a_seq_plus_64 and dayton_g2a_pix2pix_plus_64"
echo "Specified [$FILE]"

URL=http://disi.unitn.it/~hao.tang/uploads/models/SelectionGAN/${FILE}_pretrained.tar.gz
TAR_FILE=./checkpoints/${FILE}_pretrained.tar.gz
TARGET_DIR=./checkpoints/${FILE}_pretrained/

wget -N $URL -O $TAR_FILE

mkdir -p $TARGET_DIR
tar -zxvf $TAR_FILE -C ./checkpoints/
rm $TAR_FILE