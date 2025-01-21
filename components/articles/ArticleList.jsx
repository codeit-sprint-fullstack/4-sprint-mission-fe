'use client';

import { useEffect, useRef, useState } from 'react';
import api from '@/api';
import ArticleCard from './ArticleCard';
import Button from '../common/Button';
import Link from 'next/link';
import Dropdown from '../common/Dropdown';
import { useInfiniteQuery } from '@tanstack/react-query';

function ArticleList({ initialData }) {
  console.log('render article list');
  const targetRef = useRef(null);
  const [sortOption, setSortOption] = useState('latest');
  const [keyword, setKeyword] = useState('');

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['articles', { keyword, sortOption }],
    queryFn: ({ pageParam }) =>
      api.getArticles({
        keyword,
        sort: sortOption,
        skip: (pageParam - 1) * 10,
        limit: 10,
      }),
    initialPageParam: 1,
    initialData: { pages: [initialData], pageParams: [] },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    getNextPageParam: (lastPageParam) => {
      if (lastPageParam.page === lastPageParam.pageCount) {
        return undefined; // null 또는 undefined를 반환하면 hasNextPage가 false, 이외에는 true
      }
      return lastPageParam.page + 1;
    },
  });
  const articles = data?.pages.flatMap((page) => page.articles) || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setKeyword(e.target.search.value);
  };

  const handleEnterKeyDown = (e) => {
    // 빈 값 입력 시 검색 초기화
    if (e.key === 'Enter') {
      setKeyword('');
    }
  };

  const handleClickNext = () => {
    fetchNextPage();
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        console.log('intersecting');
        fetchNextPage();
      }
    });

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [data]);

  if (isLoading) return '로딩 중.............';

  return (
    <div>
      <section>
        <div className="flex justify-between items-center h-[42px] mb-6">
          <p className="text-xl font-semibold ">게시글</p>
          <Link href="/articles/post">
            <Button>글쓰기</Button>
          </Link>
        </div>
        <div className="flex justify-between mb-6">
          <form className="w-full" onSubmit={handleSubmit}>
            <p>
              <input
                type="text"
                id="search"
                name="search"
                required
                className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[42px] rounded-lg pl-4"
                placeholder="검색어를 입력해주세요"
                onKeyDown={handleEnterKeyDown}
              />
            </p>
          </form>
          <Dropdown value={sortOption} onSelect={setSortOption} />
        </div>
        {articles.map((article, index) => (
          <Link
            ref={index === articles.length - 2 ? targetRef : undefined}
            key={article.id}
            href={{
              pathname: `/articles/${article.id}`,
              query: { name: '조형민' },
            }}
          >
            <ArticleCard article={article} />
          </Link>
        ))}
      </section>
    </div>
  );
}

export default ArticleList;
