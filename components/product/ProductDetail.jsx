'use client';

import api from '@/api';
import icHeart from '@/assets/images/ic_heart.png';
import icProfile from '@/assets/images/ic_profile.png';
import defaultImg from '@/assets/images/img_default.png';
import { formattedDate } from '@/utils/formattedDate';
import lineBreakText from '@/utils/lineBreakText';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import PopMenuButton from '../common/PopMenuButton';
import TagChip from '../common/TagChip';

function ProductDetail({ initialData, productId }) {
  const { data: product } = useQuery({
    queryKey: ['product', { productId }],
    queryFn: () => api.getProduct(productId),
    initialData,
  });
  return (
    <div>
      <div className="flex items-start">
        <Image
          src={defaultImg}
          className="w-[486px] shrink-0 mr-6 rounded-2xl"
          alt={product.name}
        />
        <div className="grow-1 w-full">
          <div className="flex items-center justify-between mb-4">
            <p className="text-2xl font-semibold">{product.name}</p>
            <PopMenuButton post={product} postType="products" />
          </div>
          <p className="text-4xl font-semibold">{`${product.price.toLocaleString(
            'ko-KR'
          )}원`}</p>
          <hr className="h-px mt-4 mb-6 bg-gray-200 border-0 dark:bg-gray-700" />
          <p className="font-semibold text-[#4B5563] mb-4">상품 소개</p>
          <p className="text-[#4B5563] mb-6 leading-relaxed">
            {lineBreakText(product.description)}
          </p>
          <p className="font-semibold text-[#4B5563] mb-4">상품 태그</p>
          {product.tags.map((tag) => (
            <TagChip key={productId + tag} tag={tag} />
          ))}
          <div className={`flex items-center text-[#4B5563] text-sm mt-[62px]`}>
            <Image
              className="shrink-0 w-10 h-10 mr-4"
              src={icProfile}
              alt="profile"
            />
            <div className="flex flex-col items-start">
              <p className="mb-1">총명한판다</p>
              <p className="text-[#9CA3AF]">
                {formattedDate(product.createdAt)}
              </p>
            </div>
            <div className="flex-grow-1 w-full"></div>
            <div className="flex shrink-0">
              <div className="flex h-10 w-[1px] bg-[#d1d4da] mx-6"></div>
              <div className="flex items-center border rounded-full px-3 py-1">
                <Image className="w-8 h-8 mr-1" src={icHeart} alt="heart" />
                <p>9999+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-px my-10 bg-gray-200 border-0 dark:bg-gray-700" />
    </div>
  );
}

export default ProductDetail;
