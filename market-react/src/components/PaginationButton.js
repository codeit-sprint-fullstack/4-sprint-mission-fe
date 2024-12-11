import arrowLeft from "../assets/arrow-left.png";
import "./PaginationButton.css";

function PaginationButton({ isArrow = false, index, currentPage, onClick }) {
  const handleClick = () => {
    if (isArrow) {
      // 1. 화살표인 경우
      onClick(index);
    } else {
      // 2. 화살표가 아닌 경우(숫자인 경우)
      onClick(index);
    }
  };

  if (isArrow) {
    const altText = index === 0 ? "previous" : "next"; // 이미지 alt값 구분해주기

    return (
      <div className="pagination-button-circle" onClick={handleClick}>
        <img src={arrowLeft} alt={altText} />
      </div>
    );
  } else {
    const className = `pagination-button-circle ${
      index === currentPage ? "selected" : ""
    }`;
    return (
      <div className={className} onClick={handleClick}>
        {index}
      </div>
    );
  }
}

export default PaginationButton;