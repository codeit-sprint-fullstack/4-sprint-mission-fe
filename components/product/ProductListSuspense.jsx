import api from '@/api';
import PageContainer from '../common/Page';
import ProductList from './ProductList';

async function ProductListSuspense(props) {
  const result = await api.getProducts({ pageSize: 10 }); // panda
  // const result = await api.getProducts({ limit: 10 });
  return (
    <PageContainer>
      <ProductList initialData={result} />
    </PageContainer>
  );
}

export default ProductListSuspense;
