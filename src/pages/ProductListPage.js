import Header from "../components/Header.js";
import "./ProductListPage.css";
import Footer from "../components/Footer.js";
import ProductList from "../components/ProductList.js";
import { useEffect, useState } from "react";
import { getProducts } from "../apis/ProductService.js";
import Pagination from "../components/Pagination.js";
import useDeviceSize from "../hooks/useDeviceSize.js";

function ProductPage() {
  const [items, setItems] = useState([]);
  // const [bestItems, setBestItems] = useState([]);
  const [sort, setSort] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [loadingError, setloadingError] = useState(null);
  const { isTablet, isMobile } = useDeviceSize();

  const handleLoad = async (options) => {
    console.log(`options:${options.offset}`);
    let result;
    try {
      setloadingError(null);
      result = await getProducts(options);
      console.log(result);
    } catch (error) {
      setloadingError(error);
    } finally {
    }

    const { products, totalCount } = result;
    setItems(products);
    console.log(`result.length:${result.length}`);
    setMaxPage(Math.ceil(totalCount / options.limit));
  };

  // const handleLoadBest = async (options) => {
  //   const result = await getProducts(options);
  //   const { list } = result;
  //   setBestItems(list);
  // };

  // 판매 중인 상품 목록 불러오기
  useEffect(() => {
    handleLoad({
      sort: sort,
      offset: isTablet
        ? (page - 1) * 6
        : isMobile
        ? (page - 1) * 4
        : (page - 1) * 10,
      keyword: keyword,
      limit: isTablet ? 6 : isMobile ? 4 : 10,
    });
  }, [sort, keyword, page, isTablet, isMobile]);

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
        <ProductList
          items={items}
          value={sort}
          onClick={setSort}
          onSubmit={setKeyword}
        />
        <Pagination currentPage={page} maxPage={maxPage} onClick={setPage} />
      </main>
      <Footer />
    </div>
  );
}

export default ProductPage;
