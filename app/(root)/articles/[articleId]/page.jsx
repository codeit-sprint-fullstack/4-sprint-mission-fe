import ArticleDetail from '@/components/ArticleDetail';
import Comments from '@/components/Comments';

async function ArticleDetailPage(props) {
  const params = await props.params;
  const articleId = params.articleId;

  return (
    <main className="max-w-[1200px] mx-auto my-6">
      <ArticleDetail articleId={articleId} />
      <Comments articleId={articleId} />
    </main>
  );
}

export default ArticleDetailPage;
