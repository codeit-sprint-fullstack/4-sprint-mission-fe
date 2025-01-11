'use client';

import api from '@/api';
import ArticleCard from '@/components/ArticleCard';
import BestArticleCard from '@/components/BestArticleCard';
import Button from '@/components/Button';
import DropDown from '@/components/Dropdown';

async function ArticleListPage() {
  // 게시글 불러오기
  const articles = await api.getArticles({ sort: 'recent' });
  const bestArticles = [articles[0], articles[1], articles[2]];

  return (
    <main className="max-w-[1200px] mx-auto my-6">
      <section className="mb-10">
        <p className="text-xl font-semibold mb-6">베스트 게시글</p>
        <div className="grid grid-cols-3 gap-x-6">
          {bestArticles.map((article) => (
            <BestArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
      <section>
        <div className="flex justify-between items-center h-[42px] mb-6">
          <p className="text-xl font-semibold ">게시글</p>
          <Button sizeW={'88'} sizeH={'42'}>
            글쓰기
          </Button>
        </div>
        <div className="flex justify-between">
          <form className="w-full">
            <p>
              <input
                type="text"
                id="search"
                name="search"
                required
                className="bg-[#f3f4f6] placeholder-gray-400 w-full h-[42px] rounded-lg"
                placeholder="검색어를 입력해주세요"
              />
            </p>
          </form>
          <DropDown />
        </div>
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </section>
    </main>
  );
}

export default ArticleListPage;
