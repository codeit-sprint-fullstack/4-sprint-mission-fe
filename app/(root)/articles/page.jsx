import api from '@/api';
import BestArticleCard from '@/components/articles/BestArticleCard';
import ArticleList from '@/components/articles/ArticleList';
import Link from 'next/link';
import PageContainer from '@/components/common/Page';

async function ArticleListPage() {
  // 베스트 게시글 불러오기
  const bestArticles = await api.getArticles({ limit: 3, sort: 'latest' });
  console.log('articles page render');

  return (
    <PageContainer>
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
      <ArticleList />
    </PageContainer>
  );
}

export default ArticleListPage;
