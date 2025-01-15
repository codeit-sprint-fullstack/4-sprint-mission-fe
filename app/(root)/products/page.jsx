'use client';

import { useCallback, useEffect, useState } from 'react';
import useDeviceSize from '@/hooks/useDeviceSize';
import PageContainer from '@/components/common/Page';
import Pagination from '@/components/common/Pagination';
import api from '@/api';
import ProductList from '@/components/product/ProductList';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('latest'); // 정렬 옵션
  const [keyword, setKeyword] = useState(''); // 검색
  const [page, setPage] = useState(1); // pagination에 필요
  const [maxPage, setMaxPage] = useState(0); // pagination에 필요
  const [loadingError, setloadingError] = useState(null);
  const { isTablet, isMobile } = useDeviceSize(); // 미디어 쿼리

  const loadProducts = useCallback(
    async (options) => {
      let result;
      try {
        setloadingError(null);
        result = await api.getProducts(options);
        if (!result) return;
      } catch (error) {
        setloadingError(error);
      }
      console.log(result);
      const { products, searchCount } = result;
      setProducts(products);
      setMaxPage(Math.ceil(searchCount / options.limit));
    },
    [keyword, page, sort]
  );

  const handleSubmit = (keyword) => {
    setKeyword(keyword);
    /**
     * 키워드 검색을 했을 때 페이지를 1로 변경하기
     * - (문제 케이스) 4페이지에서 검색을 했는데 검색 결과의 페이지 수가 이보다 적을 경우 보이지 않음
     */
    if (keyword) {
      setPage(1);
    }
  };

  // 판매 중인 상품 목록 불러오기
  useEffect(() => {
    loadProducts({
      sort: sort,
      skip: isTablet
        ? (page - 1) * 6
        : isMobile
        ? (page - 1) * 4
        : (page - 1) * 10,
      keyword: keyword,
      limit: isTablet ? 6 : isMobile ? 4 : 10,
    });
  }, [sort, keyword, page, isTablet, isMobile, loadProducts]);

  return (
    <div>
      <PageContainer>
        {loadingError?.message && <span>{loadingError.message}</span>}
        <ProductList
          products={products}
          value={sort}
          onClick={setSort}
          onSubmit={handleSubmit}
        />
        <Pagination currentPage={page} maxPage={maxPage} onClick={setPage} />
      </PageContainer>
    </div>
  );
}

export default ProductListPage;
