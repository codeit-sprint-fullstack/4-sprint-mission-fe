import React from "react";
import api from "@/api";
import BestArticleCard from "./_components/BestArticleCard";
import IconSearch from "@/components/IconSearch";
import Button from "@/components/Button";
import ArticleCard from "./_components/ArticleCard";

async function BoardPage() {
  const data = await api.getArticles({ pageSize: 3 });
  const bestArticles = data.list;

  const data2 = await api.getArticles({ pageSize: 5 });
  const articles = data2.list;

  return (
    <main className="max-w-screen-xl mx-auto mt-10 mb-40">
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-6">베스트 게시글</h2>
        <div className="grid grid-cols-3 gap-4">
          {bestArticles.map((item) => {
            return <BestArticleCard key={item.id} item={item} />;
          })}
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">게시글</h2>
          <Button>글쓰기</Button>
        </div>
        <div className="flex justify-between gap-4 mb-5">
          <div className="flex-1 bg-gray-200 flex rounded-md items-center px-4">
            <IconSearch />
            <input
              className="flex-1 bg-gray-200 px-4 py-2 focus:outline-none"
              type="text"
              placeholder="검색할 상품을 입력해주세요"
            />
          </div>
          <select className="w-28 border border-gray-300 rounded-md px-3">
            <option>최신순</option>
          </select>
        </div>
        <div className="flex flex-col  gap-4">
          {articles.map((item) => {
            return <ArticleCard key={item.id} item={item} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default BoardPage;
