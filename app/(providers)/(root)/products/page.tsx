// !!!! tanStack query prefetch 적용

import api from '@/api';
import PageContainer from '@/components/common/Page';
import BestProductList from '@/components/product/BestProductList';
import ProductList from '@/components/product/ProductList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function ProductListPage() {
  const queryClient = new QueryClient();
  const bestQueryClient = new QueryClient();
  const options = { sort: 'recent', keyword: '', skip: 0, limit: 10 };
  const bestOptions = { sort: 'favorite', limit: 4 };

  await queryClient.prefetchQuery({
    queryKey: ['products', options],
    queryFn: () => api.getProducts(options),
  });
  await bestQueryClient.prefetchQuery({
    queryKey: ['products', { isBest: true }],
    queryFn: () => api.getProducts(bestOptions),
  });

  return (
    <PageContainer>
      <HydrationBoundary state={dehydrate(bestQueryClient)}>
        <BestProductList />
      </HydrationBoundary>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </PageContainer>
  );
}

export default ProductListPage;
