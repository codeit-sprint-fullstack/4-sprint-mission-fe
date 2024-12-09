import { useEffect, useState } from "react";
import { getProducts } from "../api";
import "./App.css";
import { useSearchParams } from "react-router-dom";

const MAX_VISIBLE_PAGE = 5;

function App() {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("recent");
  const [pagination, setPagination] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleLoad = async (options) => {
    console.log(options);
    let result = await getProducts(options);
    if (!result) return;

    const { list, totalCount } = result;
    console.log(result);
    setProducts(list);
    // if (options.page === 1) {
    //   setProducts(list);
    // } else {
    //   setProducts((prevItems) => [...prevItems, ...list]);
    // }
    setTotalPages(Math.ceil(totalCount / options.pageSize));
    console.log(totalPages);
  };

  const updatePagination = () => {
    const startPage = Math.max(
      currentPage - Math.floor(MAX_VISIBLE_PAGE / 2),
      1
    );
    const endPage = Math.min(startPage + MAX_VISIBLE_PAGE - 1, totalPages);

    let nextPagination = [];
    for (let i = startPage; i <= endPage; i++) {
      nextPagination.push(i);
    }
    setPagination(nextPagination);
  };

  const handleClickOrder = (newOrderBy) => () => {
    if (orderBy !== newOrderBy) {
      setOrderBy(newOrderBy);
      setCurrentPage(1);
    }
  };

  const handleClickPage = (page) => () => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoad({
      page: 1,
      pageSize: 10,
      orderBy: orderBy,
      keyword: searchTerm,
    });
  };

  useEffect(() => {
    handleLoad({ page: currentPage, pageSize: 10, orderBy: orderBy });
  }, [orderBy, currentPage]);

  useEffect(() => {
    if (totalPages > 0) {
      updatePagination();
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <div>
        <button onClick={handleClickOrder("recent")}>최신순</button>
        <button onClick={handleClickOrder("favorite")}>좋아요순</button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="검색할 상품을 입력해주세요."
          />
        </form>
      </div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <img height={200} src={product.images[0]} alt={product.name} />
            <div>{product.name}</div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          이전
        </button>
        {pagination.map((page) => (
          <button
            key={page}
            onClick={handleClickPage(page)}
            style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </>
  );
}

export default App;
