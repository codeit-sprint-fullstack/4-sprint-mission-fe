import api from '@/api';
import ArticleList from '@/components/articles/ArticleList';
import BestArticleList from '@/components/articles/BestArticleList';
import PageContainer from '@/components/common/Page';

async function ArticleListPage() {
  // 게시글 불러오기
  const data = await api.getArticles({ orderBy: 'recent', pageSize: 10 }); // panda 마켓
  // const data = await api.getArticles({ sort: 'latest', limit: 10 });
  return (
    <PageContainer>
      <BestArticleList initialData={data} />
      <ArticleList initialData={data} />
    </PageContainer>
  );
}

export default ArticleListPage;
