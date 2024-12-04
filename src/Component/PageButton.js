import "./PageButton.css";

const PAGENUMBER = 5;

export const PageButton = ({ currentPage, handleSellingPage, maxPage }) => {
  console.log(currentPage);
  const startPage = Math.floor((currentPage - 1) / PAGENUMBER) * PAGENUMBER + 1; // 처음에 보일 숫자중 첫번째
  const endPage = Math.min(maxPage, startPage + PAGENUMBER - 1); // 마지막에 보일 숫자

  const handlePageChange = (page) => {
    if (page >= 1 || page <= maxPage) {
      handleSellingPage(page);
    }
  };

  return (
    <div className="PageButtonSection">
      <button
        className="PageButton"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {new Array(endPage - startPage + 1).fill(null).map((_, index) => {
        const page = startPage + index;
        return (
          <button
            className={`PageButton ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className="PageButton"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === maxPage}
      >
        {">"}
      </button>
    </div>
  );
};
