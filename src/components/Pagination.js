import arrowLeft from "../assets/arrow-left.png";
import "./Pagination.css";

const PAGE_NUM = 5;

export function PaginationButton({ isArrow = false, index, pageNum }) {
  if (isArrow) {
    const altText = index === 0 ? "previous" : "next";

    return (
      <div className="pagination-button-circle">
        <img src={arrowLeft} alt={altText} />
      </div>
    );
  } else {
    const className = `pagination-button-circle ${
      pageNum === 1 ? "selected" : ""
    }`;
    return <div className={className}>{pageNum}</div>;
  }
}

function Pagination() {
  return (
    <div className="pagination">
      {Array(PAGE_NUM + 2)
        .fill(<PaginationButton />)
        .map((item, i) => {
          if (i === 0 || i === PAGE_NUM + 1) {
            return <PaginationButton isArrow={true} index={i} />;
          } else {
            return <PaginationButton pageNum={i} />;
          }
        })}
    </div>
  );
}

export default Pagination;
