import defaultImg from '@/assets/images/img_default.png';
import Image from 'next/image';
import PageContainer from './Page';

function ProductWidget() {
  return (
    <div className="cursor-pointer">
      <Image src={defaultImg} alt="기본 이미지" />
      <div className="w-40 h-4 mt-4 bg-gray-100"></div>
      <div className="w-14 h-4 my-4 bg-gray-100"></div>
      <div className="w-10 h-3 mt-4 bg-gray-100"></div>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <PageContainer>
      <div className="animate-pulse">
        <div className="flex justify-between items-center h-[42px] mb-6">
          <div className="text-xl font-semibold flex-grow-1">
            판매 중인 상품
          </div>
        </div>
        <div className="grid gap-6 grid-cols-5">
          {Array(10)
            .fill('')
            .map((index) => (
              <ProductWidget key={index + Math.random()} />
            ))}
        </div>
      </div>
    </PageContainer>
  );
}

export default ProductListSkeleton;
