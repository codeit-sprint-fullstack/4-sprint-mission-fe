import api from '@/api';
import BestArticleCard from '@/components/BestArticleCard';
import ArticleList from '@/components/ArticleList';
import Link from 'next/link';

async function ArticleListPage() {
  // 베스트 게시글 불러오기
  const bestArticles = await api.getArticles({ limit: 3, sort: 'latest' });

  return (
    <main className="max-w-[1200px] mx-auto my-6">
      <section className="mb-10">
        <p className="text-xl font-semibold mb-6">베스트 게시글</p>
        <div className="grid grid-cols-3 gap-x-6">
          {bestArticles.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <BestArticleCard article={article} />
            </Link>
          ))}
        </div>
      </section>
      <ArticleList />
    </main>
  );
}

export default ArticleListPage;
