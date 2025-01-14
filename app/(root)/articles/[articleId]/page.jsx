import ArticleDetail from '@/components/ArticleDetail';
import Comments from '@/components/Comments';
import PageContainer from '@/components/Page';

async function ArticleDetailPage(props) {
  const params = await props.params;
  const articleId = params.articleId;

  return (
    <PageContainer>
      <ArticleDetail articleId={articleId} />
      <Comments articleId={articleId} />
    </PageContainer>
  );
}

export default ArticleDetailPage;
