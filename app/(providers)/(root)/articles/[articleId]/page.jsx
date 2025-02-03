import api from '@/api';
import ArticleDetail from '@/components/articles/ArticleDetail';
import Comments from '@/components/articles/Comments';
import PageContainer from '@/components/common/Page';

async function ArticleDetailPage({ params }) {
  const { articleId } = await params;
  const article = await api.getArticle(articleId);
  return (
    <PageContainer>
      <ArticleDetail articleId={articleId} initialData={article} />
      <Comments articleId={articleId} />
    </PageContainer>
  );
}

export default ArticleDetailPage;
