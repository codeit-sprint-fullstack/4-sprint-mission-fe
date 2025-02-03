import PageContainer from '@/components/common/Page';
import ProductListSkeleton from '@/components/common/ProductListSkeleton';

function ProductListLoading() {
  return (
    <PageContainer>
      <ProductListSkeleton />
    </PageContainer>
  );
}

export default ProductListLoading;
