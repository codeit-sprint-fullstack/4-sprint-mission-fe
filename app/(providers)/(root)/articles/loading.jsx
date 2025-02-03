import ArticleListSkeleton from '@/components/common/ArticleListSkeleton';
import PageContainer from '@/components/common/Page';

function ArticleListLoading() {
  return (
    <PageContainer>
      <ArticleListSkeleton />
    </PageContainer>
  );
}

export default ArticleListLoading;
