import defaultProduct from '@/assets/images/default_product.png';
import icHeart from '@/assets/images/ic_heart.png';
import medal from '@/assets/images/ic_medal.png';
import Image from 'next/image';

import { formattedDate } from '@/utils/formattedDate';

function BestArticleCard({ article }) {
  return (
    <div className="px-6 pb-[9px] bg-[#f9fafb] rounded-lg">
      <div
        className={`flex justify-center items-center w-[102px] h-[30px] bg-[#3692FF] text-white font-semibold rounded-b-2xl`}
      >
        <Image src={medal} alt="medal" width={16} />
        <p className="pl-1 ">Best</p>
      </div>
      <div className="flex my-4">
        <p className="w-full h-14 text-xl font-semibold mr-2 line-clamp-2">
          {article.title}
        </p>
        <Image
          className="shrink-0 w-[72px] h-[72px]"
          src={defaultProduct}
          alt="product"
        />
      </div>
      <div
        className={`flex items-center justify-between text-[#4B5563] text-sm`}
      >
        <div className="flex items-center">
          <p>{article.writer.nickname}</p>
          <Image className="w-4 h-4 ml-2 mr-1" src={icHeart} alt="heart" />
          <p>9999+</p>
        </div>
        <p className="text-[#9CA3AF]">{formattedDate(article.createdAt)}</p>
      </div>
    </div>
  );
}

export default BestArticleCard;
