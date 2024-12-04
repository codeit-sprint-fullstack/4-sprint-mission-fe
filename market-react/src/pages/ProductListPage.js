import Header from '../components/Header.js';
import './ProductListPage.css';
import Footer from '../components/Footer.js';
import ProductList from '../components/ProductList.js';
import { useCallback, useEffect, useState } from 'react';
import { getProducts } from '../apis/ProductService.js';
import Pagination from '../components/Pagination.js';
import useDeviceSize from '../hooks/useDeviceSize.js';

function ProductListPage() {
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState('recent'); // 정렬 옵션
  const [keyword, setKeyword] = useState(''); // 검색
  const [page, setPage] = useState(1); // pagination에 필요
  const [maxPage, setMaxPage] = useState(0); // pagination에 필요
  const [loadingError, setloadingError] = useState(null);
  const { isTablet, isMobile } = useDeviceSize(); // 미디어 쿼리

  const handleLoad = useCallback(
    async (options) => {
      let result;
      try {
        setloadingError(null);
        result = await getProducts(options);
        if (!result) return;
      } catch (error) {
        setloadingError(error);
      }

      const { products, searchCount } = result;
      setItems(products);
      setMaxPage(Math.ceil(searchCount / options.limit));
      console.log(page, sort, keyword);
    },
    [keyword, page, sort]
  );

  

  const handleSubmit = (keyword) => {
    setKeyword(keyword);
    
    if (keyword) {
      setPage(1);
    }
  };

  // 판매 중인 상품 목록 불러오기
  useEffect(() => {
    handleLoad({
      sort: sort,
      offset: isTablet ? (page - 1) * 6 : isMobile ? (page - 1) * 4 : (page - 1) * 10,
      keyword: keyword,
      limit: isTablet ? 6 : isMobile ? 4 : 10,
    });
  }, [sort, keyword, page, isTablet, isMobile, handleLoad]);

  
  return (
    <div>
      <Header isProductPage={true} />
      {loadingError?.message && <span>{loadingError.message}</span>}
      <main>
        {/* <ProductList isBest={true} items={bestItems} /> */}
        <ProductList items={items} value={sort} onClick={setSort} onSubmit={handleSubmit} />
        <Pagination currentPage={page} maxPage={maxPage} onClick={setPage} />
      </main>
      <Footer />
    </div>
  );
}

export default ProductListPage;