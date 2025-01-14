import ArticleDetail from '@/components/articles/ArticleDetail';
import Comments from '@/components/articles/Comments';
import PageContainer from '@/components/common/Page';

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
