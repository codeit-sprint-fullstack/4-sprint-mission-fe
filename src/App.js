import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import { useEffect, useState } from "react";
import { getProducts } from "./api";
import Pagination from "./components/Pagination";
import useDeviceSize from "./hooks/useDeviceSize";

function App() {
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);
  const [loadingError, setloadingError] = useState(null);
  const { isTablet, isMobile } = useDeviceSize();

  const handleLoad = async (options) => {
    let result;
    try {
      setloadingError(null);
      result = await getProducts(options);
    } catch (error) {
      setloadingError(error);
    } finally {
    }

    const { list, totalCount } = result;
    setItems(list);
    setMaxPage(Math.ceil(totalCount / options.pageSize));
  };

  const handleLoadBest = async (options) => {
    const result = await getProducts(options);
    const { list } = result;
    setBestItems(list);
  };

  // 판매 중인 상품 목록 불러오기
  useEffect(() => {
    handleLoad({
      page: page,
      pageSize: isTablet ? 6 : isMobile ? 4 : 10,
      orderBy: orderBy,
      keyword: keyword,
    });
  }, [orderBy, keyword, page, isTablet, isMobile]);

  // 베스트 상품 목록 불러오기
  useEffect(() => {
    handleLoadBest({
      page: 1,
      pageSize: isTablet ? 2 : isMobile ? 1 : 4,
      orderBy: "favorite",
    });
  }, [isTablet, isMobile]);

  return (
    <div>
      <Header />
      {loadingError?.message && <span>{loadingError.message}</span>}
      <main>
        <ProductList isBest={true} items={bestItems} />
        <ProductList
          items={items}
          value={orderBy}
          onClick={setOrderBy}
          onSubmit={setKeyword}
        />
        <Pagination currentPage={page} maxPage={maxPage} onClick={setPage} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
