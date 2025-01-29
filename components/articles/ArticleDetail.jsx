'use client';

import api from '@/api';
import icHeart from '@/assets/images/ic_heart.png';
import icProfile from '@/assets/images/ic_profile.png';
import { formattedDate } from '@/utils/formattedDate';
import lineBreakText from '@/utils/lineBreakText';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import PopMenuButton from '../common/PopMenuButton';

function ArticleDetail({ articleId, initialData }) {
  const { data: article } = useQuery({
    queryKey: ['article', { articleId }],
    queryFn: () => api.getArticle(articleId),
    initialData,
    staleTime: 12000,
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold"> {article.title}</p>
        <PopMenuButton post={article} postType="articles" />
      </div>
      <div
        className={`flex items-center text-[#4B5563] text-sm h-[72px] border-b mb-6`}
      >
        <Image className="shrink-0 w-10 h-10" src={icProfile} alt="profile" />
        <p className="ml-4 mr-2">{article.writer.nickname}</p>
        <p className="text-[#9CA3AF]">{formattedDate(article.createdAt)}</p>
        <div className="flex h-10 w-[1px] bg-[#d1d4da] mx-8"></div>
        <div className="flex items-center border rounded-full px-3 py-1">
          <Image className="w-8 h-8 mr-1" src={icHeart} alt="heart" />
          <p>9999+</p>
        </div>
      </div>
      <p className="text-lg">{lineBreakText(article.content)}</p>
    </div>
  );
}

export default ArticleDetail;
