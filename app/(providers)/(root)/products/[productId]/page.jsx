import api from '@/api';
import Comments from '@/components/articles/Comments';
import PageContainer from '@/components/common/Page';
import ProductDetail from '@/components/product/ProductDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function ProductDetailPage({ params }) {
  const queryClient = new QueryClient();
  const { productId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ['product', { productId }],
    queryFn: () => api.getProduct(productId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <ProductDetail productId={productId} />
        <Comments productId={productId} />
      </PageContainer>
    </HydrationBoundary>
  );
}

// 댓글도 이 화면에서 미리 불러와서 initialData로 전달해보자

export default ProductDetailPage;
