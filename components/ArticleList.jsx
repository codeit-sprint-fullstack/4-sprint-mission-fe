'use client';

import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import api from '@/api';
import ArticleCard from './ArticleCard';
import Button from './Button';
import Link from 'next/link';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [sortOption, setSortOption] = useState('latest');
  const [keyword, setKeyword] = useState('');

  const handleArticlesLoad = async (options) => {
    console.log('게시글 불러오기');
    const result = await api.getArticles(options);
    setArticles(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`keyword:${e.target.search.value}`);
    setKeyword(e.target.search.value);
  };

  const handleEnterKeyDown = (e) => {
    // 빈 값 입력 시 검색 초기화
    if (e.key === 'Enter') {
      setKeyword('');
    }
  };

  console.log('일반 게시글 로딩');
  useEffect(() => {
    handleArticlesLoad({ keyword, sort: sortOption });
  }, [keyword, sortOption]);

  return (
    <section>
      <div className="flex justify-between items-center h-[42px] mb-6">
        <p className="text-xl font-semibold ">게시글</p>
        <Button>글쓰기</Button>
        {/* <button
          className={`shrink-0 w-[88px] h-[42px] bg-[#3692FF] text-white rounded-lg`}
        >
          글쓰기
        </button> */}
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
      {articles.map((article) => (
        <Link key={article.id} href={`/articles/${article.id}`}>
          <ArticleCard article={article} />
        </Link>
      ))}
    </section>
  );
}

export default ArticleList;
