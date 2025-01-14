import api from '@/api';
import BestArticleCard from '@/components/BestArticleCard';
import ArticleList from '@/components/ArticleList';
import Link from 'next/link';
import PageContainer from '@/components/Page';

async function ArticleListPage() {
  // 베스트 게시글 불러오기
  const bestArticles = await api.getArticles({ limit: 3, sort: 'latest' });

  return (
    <PageContainer>
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
    </PageContainer>
  );
}

export default ArticleListPage;
