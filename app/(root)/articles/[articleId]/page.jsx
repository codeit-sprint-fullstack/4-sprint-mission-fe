import api from '@/api';
import ArticleDetail from '@/components/articles/ArticleDetail';
import Comments from '@/components/articles/Comments';
import PageContainer from '@/components/common/Page';

async function ArticleDetailPage(props) {
  console.log('render article detail');
  const params = await props.params;
  const articleId = params.articleId;
  const article = await api.getArticle(articleId);

  return (
    <PageContainer>
      <ArticleDetail articleId={articleId} initialData={article} />
      <Comments articleId={articleId} />
    </PageContainer>
  );
}

export default ArticleDetailPage;
