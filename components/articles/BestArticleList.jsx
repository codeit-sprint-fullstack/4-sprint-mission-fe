'use client';

import React from 'react';
import BestArticleCard from './BestArticleCard';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import api from '@/api';

function BestArticleList({ initialData }) {
  const { data: bestArticles } = useQuery({
    queryFn: () => api.getArticles({ limit: 3, sort: 'latest' }),
    queryKey: ['articles', { isBest: true }],
    initialData,
  });
  return (
    <section className="mb-10">
      <div className="h-[42px] flex items-center mb-6">
        <p className="text-xl font-semibold">베스트 게시글</p>
      </div>
      <div className="grid grid-cols-3 gap-x-6">
        {bestArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.id}`}>
            <BestArticleCard article={article} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BestArticleList;
