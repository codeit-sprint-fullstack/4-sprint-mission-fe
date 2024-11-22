// import { useState } from "react";
import arrowLeft from "../assets/arrow-left.png";
import "./Pagination.css";

const PAGE_NUM = 5;

export function PaginationButton({
  isArrow = false,
  index,
  currentPage,
  onClick,
}) {
  const handleClick = () => {
    if (isArrow) {
      // 1. 화살표인 경우
      // if (index === 0) {
      //   // 1-1. 왼쪽 화살표
      // } else {
      //   // 1-2. 오른쪽 화살표
      //   onClick();
      // }
      onClick(index);
    } else {
      // 2. 화살표가 아닌 경우(숫자인 경우)
      console.log(`index:${index}`);
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

function Pagination({ currentPage, onClick }) {
  console.log(`currentPage:${currentPage}`); // 왜 여기가 두 번 실행이 될까??

  // 여기의 함수를 바꿔보자. currentPage에 따라서 숫자를 바꿔주는 거지!
  //  i값을 사용하지 말고 currentPage에 따라서 만들어 보자.
  // isSelected 여부도 여기서 결정해서 내려보내는 것으로.
  // button의 역할은 setPage에 번호만 전달

  // handleClick은 여기서 정의해서 내려보내야 할듯.
  const currentStep = Math.ceil(currentPage / PAGE_NUM) - 1;
  const handleNumberClick = (page) => {
    onClick(page);
  };
  const handleArrowClick = (index) => {
    if (index === 0) {
      onClick(PAGE_NUM * (currentStep - 1) + 1);
    } else {
      onClick(PAGE_NUM * (currentStep + 1) + 1);
    }
  };
  console.log(`currentStep: ${currentStep}`);
  return (
    <div className="pagination">
      {Array(PAGE_NUM + 2)
        .fill()
        .map((item, i) => {
          if (i === 0 || i === PAGE_NUM + 1) {
            return (
              <PaginationButton
                key={i}
                isArrow={true}
                index={i}
                onClick={handleArrowClick}
              />
            );
          } else {
            return (
              <PaginationButton
                key={i}
                index={PAGE_NUM * currentStep + i}
                currentPage={currentPage}
                onClick={handleNumberClick}
              />
            );
          }
        })}
    </div>
  );
}

export default Pagination;
