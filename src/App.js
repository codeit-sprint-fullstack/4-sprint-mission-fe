import Header from "./components/Header";
import "./App.css";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import { useEffect, useState } from "react";
import { getProducts } from "./api";
import Pagination from "./components/Pagination";

function App() {
  const [items, setItems] = useState([]);
  const [bestItems, setBestItems] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const handleLoad = async (options) => {
    const result = await getProducts(options);
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
      pageSize: 10,
      orderBy: orderBy,
      keyword: keyword,
    });
  }, [orderBy, keyword, page]);

  // 베스트 상품 목록 불러오기
  useEffect(() => {
    handleLoadBest({ page: 1, pageSize: 4, orderBy: "favorite" });
  }, []);

  return (
    <div>
      <Header />
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
