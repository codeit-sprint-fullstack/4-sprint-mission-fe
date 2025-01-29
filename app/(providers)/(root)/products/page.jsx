import api from '@/api';
import PageContainer from '@/components/common/Page';
import ProductList from '@/components/product/ProductList';

async function ProductListPage() {
  const result = await api.getProducts({ pageSize: 10 }); // panda
  // const result = await api.getProducts({ limit: 10 });
  return (
    <PageContainer>
      <ProductList initialData={result} />
    </PageContainer>
  );
}

export default ProductListPage;
