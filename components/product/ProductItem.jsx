import icHeart from '@/assets/images/ic_heart.png';
import defaultImg from '@/assets/images/img_default.png';
import { useAuth } from '@/contexts/AuthContext';
import { useModal } from '@/contexts/ModalContext';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AlertModal from '../common/AlertModal';

function ProductItem({ product }) {
  const { name, price } = product;
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const modal = useModal();

  const handleClickProduct = () => {
    if (!isLoggedIn)
      return modal.open(
        <AlertModal alertMessage="로그인이 필요한 서비스입니다." />
      );
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="cursor-pointer" onClick={handleClickProduct}>
      <div className="w-full pb-[100%] relative shrink-0 mr-6">
        <Image
          src={product.imgUrls.length !== 0 ? product.imgUrls[0] : defaultImg}
          fill
          className="object-cover rounded-2xl"
          alt={product.name}
        />
      </div>
      <p className="text-[#1f2937] text-sm mt-4">{name}</p>
      <p className="text-[#1f2937] mt-4 mb-[14px] font-semibold">{`${price.toLocaleString()}원`}</p>
      <div className="text-[#4b5563] flex items-center text-xs">
        <Image src={icHeart} alt="heart" className="w-4 mr-[6px]" />
        {product._count.productLikes}
      </div>
    </div>
  );
}

export default ProductItem;
