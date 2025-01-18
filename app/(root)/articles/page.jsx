import api from '@/api';
import ArticleList from '@/components/articles/ArticleList';
import BestArticleList from '@/components/articles/BestArticleList';
import PageContainer from '@/components/common/Page';

async function ArticleListPage() {
  // 게시글 불러오기
  const articles = await api.getArticles({ sort: 'latest' });

  return (
    <PageContainer>
      <BestArticleList initialData={articles.slice(0, 3)} />
      <ArticleList initialData={articles} />
    </PageContainer>
  );
}

export default ArticleListPage;
