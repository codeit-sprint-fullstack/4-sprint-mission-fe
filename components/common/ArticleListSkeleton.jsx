import medal from '@/assets/images/ic_medal.png';
import defaultImg from '@/assets/images/img_default.png';
import Image from 'next/image';
import PageContainer from './Page';

function BestArticleWidget() {
  return (
    <div className="px-6 pb-[9px] bg-[#f9fafb] rounded-lg mb-10">
      <div
        className={`flex justify-center items-center w-[102px] h-[30px] bg-[#3692FF] text-white font-semibold rounded-b-2xl`}
      >
        <Image src={medal} alt="medal" width={16} />
        <p className="pl-1 ">Best</p>
      </div>
      <div className="flex my-4">
        <div className="w-full h-5  bg-gray-100"></div>
        <Image
          className="shrink-0 w-[72px] h-[72px]"
          src={defaultImg}
          alt="product"
        />
      </div>
      <div className="w-14 h-4 my-1 bg-gray-100"></div>
    </div>
  );
}

function ArticleWidget() {
  return (
    <div className="bg-[#f9fafb] border-b mb-6">
      <div className="flex my-4">
        <div className="mt-2 w-full h-5  bg-gray-100"></div>
        <Image
          className="shrink-0 w-[72px] h-[72px]"
          src={defaultImg}
          alt="product"
        />
      </div>
      <div className="w-20 h-5 my-1 bg-gray-100"></div>
    </div>
  );
}

function ArticleListSkeleton() {
  return (
    <PageContainer>
      <div className="animate-pulse">
        <div className="flex justify-between items-center h-[42px] mb-6">
          <div className="text-xl font-semibold flex-grow-1">베스트 게시글</div>
        </div>
        <div className="grid grid-cols-3 gap-x-6">
          {Array(3)
            .fill('')
            .map((index) => (
              <BestArticleWidget key={index + Math.random()} />
            ))}
        </div>
      </div>
      <div>
        <section>
          <div className="flex justify-between items-center h-[42px] mb-6">
            <p className="text-xl font-semibold ">게시글</p>
          </div>
          <div className="flex justify-between w-full h-10 mb-6 bg-gray-100"></div>
          {Array(10)
            .fill('')
            .map((_, index) => (
              <ArticleWidget key={`${index}`} />
            ))}
        </section>
      </div>
    </PageContainer>
  );
}

export default ArticleListSkeleton;
