import api from '@/api';
import Comments from '@/components/articles/Comments';
import PageContainer from '@/components/common/Page';
import ProductDetail from '@/components/product/ProductDetail';

async function ProductDetailPage(props) {
  const params = await props.params;
  const productId = params.productId;
  const product = await api.getProduct(productId);
  return (
    <PageContainer>
      <ProductDetail productId={productId} initialData={product} />
      <Comments productId={productId} />
    </PageContainer>
  );
}

export default ProductDetailPage;
