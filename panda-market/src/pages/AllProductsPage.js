import React, { useState } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import usePagination from '../hooks/usePagination';
import ProductCard from '../components/ProductCard';

const AllProductsPage = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');
  const itemsPerPage = 10;

  const { currentPage, totalPages, setPage } = usePagination({
    totalItems: 100,
    itemsPerPage,
  });

  const { data: products, loading, error } = useFetchProducts({
    sortBy,
    page: currentPage,
    pageSize: itemsPerPage,
    search,
  });

  const handleSearch = () => {
    setSearch(searchTerm); // 검색 버튼 클릭 시 검색어 업데이트
    setPage(1); // 검색 시 페이지를 처음으로 초기화
  };

  const handleAddProduct = () => {
    // 상품 추가 동작 구현
    alert('상품 추가 버튼 클릭됨!');
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const safeProducts = Array.isArray(products) ? products : [];

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>에러 발생: {error}</p>;
  }

  return (
    <main>
      <h2>모든 상품</h2>
      <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={handleSearch}
              style={{
                position: 'absolute',
                left: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#3692FF',
              }}
            >
              <img style={{ paddingLeft: '10px', width: '19px' }} src="/Vector.png" alt="검색 아이콘" />
            </button>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '250px',
                paddingTop: '10px',
                paddingBottom: '10px',
                paddingLeft: '30px', // 버튼 공간 확보
                border: '0',
                backgroundColor: 'rgba(243, 244, 246, 1)',
                borderRadius: '15px',
              }}
            />
          </div>
          <button
            onClick={handleAddProduct}
            style={{
              marginRight: '10px',
              padding: '12px 23px 12px 23px',
              backgroundColor: 'rgba(54, 146, 255, 1)',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            상품 추가
          </button>
        </div>
        <select
          style={{
            width: '130px',
            height: '42px',
            padding: '12px 20px 12px 20px',
            borderRadius: '12px',
            border: '1px solid rgba(229, 231, 235, 1)',
          }}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">최신 순</option>
          <option value="favorite">좋아요 순</option>
        </select>
      </div>
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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '5px' }}>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            width: '40px',
            height: '40px',
            padding: '5px 10px',
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid rgba(229, 231, 235, 1)',
            borderRadius: '25px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            style={{
              width: '40px',
              height: '40px',
              padding: '5px 10px',
              backgroundColor: currentPage === index + 1 ? '#3692FF' : '#fff',
              color: currentPage === index + 1 ? '#fff' : '#000',
              border: '1px solid rgba(229, 231, 235, 1)',
              borderRadius: '25px',
              cursor: 'pointer',
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            width: '40px',
            height: '40px',
            padding: '5px 10px',
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid rgba(229, 231, 235, 1)',
            borderRadius: '25px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          &gt;
        </button>
      </div>
    </main>
  );
};

export default AllProductsPage;