import Image from 'next/image';
import Link from 'next/link';
import defaultImg from '@/assets/images/img_default.png';
import icHeart from '@/assets/images/ic_heart.png';

function ProductItem({ product }) {
  const { name, price, favoriteCount = 0 } = product;

  return (
    <Link href={`/products/${product.id}`}>
      <div>
        <Image src={defaultImg} alt="기본 이미지" />
        <p className="text-[#1f2937] text-sm mt-4">{name}</p>
        <p className="text-[#1f2937] mt-4 mb-[14px] font-semibold">{`${price.toLocaleString()}원`}</p>
        <div className="text-[#4b5563] flex items-center text-xs">
          <Image src={icHeart} alt="heart" className="w-4 mr-[6px]" />
          {favoriteCount}
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
