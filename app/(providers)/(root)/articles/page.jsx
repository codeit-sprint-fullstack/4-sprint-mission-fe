"use client";

import { useEffect, useMemo, useState } from "react";
import api from "@/api";
import BestArticleCard from "./_components/BestArticleCard";
import IconSearch from "@/components/IconSearch";
import Button from "@/components/Button";
import ArticleCard from "./_components/ArticleCard";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

function BoardPage() {
  const [searchKeyword, setSearchKeyword] = useState("");

  const { data: articles, isLoading } = useQuery({
    queryFn: () => api.getArticles(),
    queryKey: ["articles"],
    initialData: [],
  });

  const filteredArticles = useMemo(() => {
    if (!searchKeyword) return articles;
    return articles.filter((item) =>
      item.title.toLowerCase().includes(searchKeyword.toLocaleLowerCase())
    );
  }, [articles, searchKeyword]);

  const handleSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  if (isLoading) return <div>로딩중...</div>;

  return (
    <main className="max-w-screen-xl mx-auto mt-10 mb-40">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-6">베스트 게시글</h2>
        <div className="grid grid-cols-3 gap-4">
          {articles.slice(0, 3).map((item) => {
            return <BestArticleCard key={item.id} item={item} />;
          })}
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">게시글</h2>
          <Link href={`/articles/new`}>
            <Button>글쓰기</Button>
          </Link>
        </div>
        <div className="flex justify-between gap-4 mb-5">
          <div className="flex-1 bg-gray-200 flex rounded-md items-center px-4">
            <IconSearch />
            <input
              className="flex-1 bg-gray-200 px-4 py-2 focus:outline-none"
              type="text"
              value={searchKeyword}
              placeholder="검색할 상품을 입력해주세요"
              onChange={handleSearchKeyword}
            />
          </div>
          <select className="w-28 border border-gray-300 rounded-md px-3">
            <option>최신 순</option>
            <option>좋아요 순</option>
          </select>
        </div>
        <div className="flex flex-col  gap-4">
          {filteredArticles.map((item) => {
            return <ArticleCard key={item.id} item={item} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default BoardPage;
