import api from '@/api';
import CommentList from '@/components/articles/CommentList';
import PageContainer from '@/components/common/Page';
import ProductDetail from '@/components/product/ProductDetail';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Params = Promise<{
  productId: string;
}>;

async function ProductDetailPage({ params }: { params: Params }) {
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
        <CommentList productId={productId} />
      </PageContainer>
    </HydrationBoundary>
  );
}

export default ProductDetailPage;
