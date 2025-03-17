import api from '@/api';
import ArticleDetail from '@/components/articles/ArticleDetail';
import CommentList from '@/components/articles/CommentList';
import PageContainer from '@/components/common/Page';
import { ArticleDetailDto } from '@/types/dtos/article.dto';

type Params = Promise<{
  articleId: string;
}>;

async function ArticleDetailPage({ params }: { params: Params }) {
  const { articleId } = await params;
  const article: ArticleDetailDto = await api.getArticle(articleId);
  return (
    <PageContainer>
      <ArticleDetail articleId={articleId} initialData={article} />
      <CommentList articleId={articleId} />
    </PageContainer>
  );
}

export default ArticleDetailPage;
