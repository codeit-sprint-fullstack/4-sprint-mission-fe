import React from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductCard from '../components/ProductCard';

const BestProductsPage = () => {
  const { data: bestProducts, loading, error } = useFetchProducts({
    sortBy: 'favorite',
  });

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>베스트 상품 데이터를 불러오는 데 실패했습니다.</p>;

  const safeProducts = Array.isArray(bestProducts) ? bestProducts : [];

  return (
    <main>
      <h2>베스트 상품</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px',
        }}
      >
        {safeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default BestProductsPage;
