import api from '@/api';
import ArticleList from '@/components/articles/ArticleList';
import BestArticleList from '@/components/articles/BestArticleList';
import PageContainer from '@/components/common/Page';

async function ArticleListPage() {
  // 게시글 불러오기
  const data = await api.getArticles({ sort: 'latest', limit: 10 });
  console.log(data);
  return (
    <PageContainer>
      <BestArticleList initialData={data.articles.slice(0, 3)} />
      <ArticleList initialData={data} />
    </PageContainer>
  );
}

export default ArticleListPage;
