import api from '@/api';
import Comments from '@/components/articles/Comments';
import PageContainer from '@/components/common/Page';
import ProductDetail from '@/components/product/ProductDetail';

async function ProductDetailPage({ params }) {
  const { productId } = await params;
  const product = await api.getProduct(productId);
  return (
    <PageContainer>
      <ProductDetail productId={productId} initialData={product} />
      <Comments productId={productId} />
    </PageContainer>
  );
}

// 댓글도 이 화면에서 미리 불러와서 initialData로 전달해보자

export default ProductDetailPage;
