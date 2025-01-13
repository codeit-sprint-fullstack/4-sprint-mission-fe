import api from '@/api';
import React from 'react';
import PopMenuButton from './PopMenuButton';
import Image from 'next/image';
import icHeart from '@/assets/images/ic_heart.png';
import icProfile from '@/assets/images/ic_profile.png';

async function ArticleDetail({ articleId }) {
  const article = await api.getArticle(articleId);

  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">{article.title}</p>
        <PopMenuButton />
      </div>
      <div
        className={`flex items-center text-[#4B5563] text-sm h-[72px] border-b mb-6`}
      >
        <Image className="shrink-0 w-10 h-10" src={icProfile} alt="profile" />
        <p className="ml-4 mr-2">총명한판다</p>
        <p className="text-[#9CA3AF]">2024.04.16</p>
        <div className="flex h-10 w-[1px] bg-[#d1d4da] mx-8"></div>
        <div className="flex items-center border rounded-full px-3 py-1">
          <Image className="w-8 h-8 mr-1" src={icHeart} alt="heart" />
          <p>9999+</p>
        </div>
      </div>
      <p className="text-lg">{article.content}</p>
    </div>
  );
}

export default ArticleDetail;
