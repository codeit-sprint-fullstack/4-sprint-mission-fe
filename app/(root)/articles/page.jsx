import api from '@/api';
import ArticleCard from '@/components/ArticleCard';
import BestArticleCard from '@/components/BestArticleCard';
import Button from '@/components/Button';
import Dropdown from '@/components/Dropdown';
import icSearch from '@/assets/images/ic_search.png';
import ArticleList from '@/components/ArticleList';

async function ArticleListPage() {
  // 베스트 게시글 불러오기
  console.log('베스트 게시글 로딩');
  const bestArticles = await api.getArticles({ limit: 3, sort: 'latest' });

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
      <ArticleList />
    </main>
  );
}

export default ArticleListPage;
