FILE=$1

echo "Note: available models are cvusa_fork_plus, cvusa_pix2pix_plus, cvusa_seq_plus, dayton_a2g_fork_plus, dayton_a2g_seq_plus, dayton_a2g_pix2pix_plus, dayton_g2a_pix2pix_plus, dayton_g2a_seq_plus, dayton_g2a_fork_plus, ego2top_fork_plus, ego2top_seq_plus, ego2top_pix2pix_plus, sva_pix2pix_plus, sva_seq_plus and sva_fork_plus"
echo "Specified [$FILE]"

URL=http://disi.unitn.it/~hao.tang/uploads/models/SelectionGAN/${FILE}_pretrained.tar.gz
TAR_FILE=./checkpoints/${FILE}_pretrained.tar.gz
TARGET_DIR=./checkpoints/${FILE}_pretrained/

wget -N $URL -O $TAR_FILE

mkdir -p $TARGET_DIR
tar -zxvf $TAR_FILE -C ./checkpoints/
rm $TAR_FILE