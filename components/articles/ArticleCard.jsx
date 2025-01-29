import defaultProduct from '@/assets/images/default_product.png';
import icHeart from '@/assets/images/ic_heart.png';
import icProfile from '@/assets/images/ic_profile.png';
import { formattedDate } from '@/utils/formattedDate';
import Image from 'next/image';

function ArticleCard({ article }) {
  return (
    <div className="bg-[#f9fafb] border-b mb-6">
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
        className={`flex items-center justify-between text-[#4B5563] text-sm mb-6`}
      >
        <div className="flex items-center">
          <Image className="shrink-0 w-6 h-6" src={icProfile} alt="profile" />
          <p className="mx-2">{article.writer.nickname}</p>
          <p className="text-[#9CA3AF]">{formattedDate(article.createdAt)}</p>
        </div>
        <div className="flex items-center">
          <Image className="w-6 h-6 mr-2" src={icHeart} alt="heart" />
          <p className="">9999+</p>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
