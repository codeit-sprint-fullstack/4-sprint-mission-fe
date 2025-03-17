'use client';

import api from '@/api';
import { ArticleCardDto, ArticleListDto } from '@/types/dtos/article.dto';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import Button from '../common/Button';
import Dropdown from '../common/Dropdown';
import ArticleCard from './ArticleCard';

function ArticleList({ initialData }: { initialData: ArticleListDto[] }) {
  const observeTargetRef = useRef<HTMLAnchorElement>(null);
  const [sortOption, setSortOption] = useState<string>('recent'); // panda
  // const [sortOption, setSortOption] = useState('latest');
  const [keyword, setKeyword] = useState<string>('');

  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ['articles', { keyword, sortOption }],
    queryFn: ({ pageParam }) =>
      api.getArticles({
        // keyword,
        // sort: sortOption,
        // page,
        // pageSize: 10,
        keyword,
        sort: sortOption,
        skip: (pageParam - 1) * 10,
        limit: 10,
      }),
    initialPageParam: 1,
    initialData: { pages: [initialData], pageParams: [] },
    staleTime: 120000,
    // gcTime: 0,
    // refetchOnMount: true,
    getNextPageParam: (lastPageParam) => {
      if (lastPageParam.page === lastPageParam.pageCount) {
        return undefined; // null 또는 undefined를 반환하면 hasNextPage가 false, 이외에는 true
      }
      return lastPageParam.page + 1;
    },
    retryOnMount: true,
    gcTime: 0,
  });

  const articles: ArticleCardDto[] =
    data?.pages.flatMap((page) => {
      return page;
    }) || [];

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const { search } = e.target as HTMLFormElement;
    setKeyword(search.value);
  };

  const handleEnterKeyDown: KeyboardEventHandler = (e) => {
    // 빈 값 입력 시 검색 초기화
    if (e.key === 'Enter') {
      setKeyword('');
    }
  };

  const handleClickNext = () => {
    fetchNextPage();
  };

  useEffect(() => {
    const targetInstance = observeTargetRef.current;
    const observer = new IntersectionObserver((entries, observer) => {
      const entry = entries[0];

      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    if (targetInstance) observer.observe(targetInstance);

    return () => {
      if (targetInstance) observer.unobserve(targetInstance);
    };
  }, [data, fetchNextPage]);

  if (isLoading) return <p>{'로딩 중.............'}</p>;

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
            ref={index === articles.length - 2 ? observeTargetRef : undefined}
            key={article.id}
            href={{
              pathname: `/articles/${article.id}`,
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
