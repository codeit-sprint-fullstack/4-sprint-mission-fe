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
  // const [bestItems, setBestItems] = useState([]);
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

  // const handleLoadBest = async (options) => {
  //   const result = await getProducts(options);
  //   const { list } = result;
  //   setBestItems(list);
  // };

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
    handleLoad({
      sort: sort,
      offset: isTablet ? (page - 1) * 6 : isMobile ? (page - 1) * 4 : (page - 1) * 10,
      keyword: keyword,
      limit: isTablet ? 6 : isMobile ? 4 : 10,
    });
  }, [sort, keyword, page, isTablet, isMobile, handleLoad]);

  // 베스트 상품 목록 불러오기
  // useEffect(() => {
  //   handleLoadBest({
  //     page: 1,
  //     pageSize: isTablet ? 2 : isMobile ? 1 : 4,
  //     orderBy: "favorite",
  //   });
  // }, [isTablet, isMobile]);

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