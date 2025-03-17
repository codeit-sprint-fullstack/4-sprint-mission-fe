import defaultImg from '@/assets/images/img_default.png';
import Image from 'next/image';
import PageContainer from './Page';

function ProductSkeleton() {
  return (
    <PageContainer>
      <div>
        <div className="flex items-start">
          <Image
            src={defaultImg}
            className="w-[486px] shrink-0 mr-6 rounded-2xl"
            alt="default"
          />
          <div className="grow-1 w-full">
            <div className="w-20 h-4 mt-4 bg-gray-100"></div>
            <div className="w-40 h-12 mt-4 bg-gray-100"></div>
            <hr className="h-px mt-5 mb-7 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="w-20 h-4 mt-4 bg-gray-100"></div>
            <div className="w-36 h-4 mt-6 bg-gray-100"></div>
            <div className="w-40 h-4 mt-9 bg-gray-100"></div>
            <div className="w-40 h-8 mt-4 bg-gray-100"></div>
          </div>
        </div>
        <hr className="h-px my-10 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
    </PageContainer>
  );
}

export default ProductSkeleton;
