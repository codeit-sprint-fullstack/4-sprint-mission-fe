import api from '@/api';
import BestArticleCard from '@/components/articles/BestArticleCard';
import ArticleList from '@/components/articles/ArticleList';
import Link from 'next/link';
import PageContainer from '@/components/common/Page';
import BestArticleList from '@/components/articles/BestArticleList';

async function ArticleListPage() {
  // 베스트 게시글 불러오기
  const bestArticles = await api.getArticles({ limit: 3, sort: 'latest' });

  return (
    <PageContainer>
      <BestArticleList initialData={bestArticles} />
      <ArticleList />
    </PageContainer>
  );
}

export default ArticleListPage;
