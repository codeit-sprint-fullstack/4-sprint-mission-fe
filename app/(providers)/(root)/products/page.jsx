import api from '@/api';
import PageContainer from '@/components/common/Page';
import ProductList from '@/components/product/ProductList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function ProductListPage() {
  const queryClient = new QueryClient();
  const options = { orderBy: 'recent', keyword: '', page: 1, pageSize: 10 };

  await queryClient.prefetchQuery({
    queryKey: ['products', options],
    queryFn: () => api.getProducts(options),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <ProductList />
      </PageContainer>
    </HydrationBoundary>
  );
}

export default ProductListPage;
