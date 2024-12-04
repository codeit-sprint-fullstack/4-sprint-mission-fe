import { Fragment } from "react";
import "./Pagination.css";
import PaginationButton from "./PaginationButton.js";

const PAGE_LENGTH = 5; // 페이지 표시 개수

function Pagination({ currentPage, onClick, maxPage }) {
  // 현재 페이지와 페이지 표시 개수를 바탕으로 기준 숫자 설정
  const referenceNum = Math.ceil(currentPage / PAGE_LENGTH) - 1;

  // 숫자 버튼 클릭 실행 함수
  const handleNumberClick = (page) => {
    onClick(page);
  };

  // 화살표 버튼 클릭 실행 함수
  const handleArrowClick = (index) => {
    if (index === 0) {
      // 1. 좌측 화살표 클릭
      // 첫 페이지에서는 작동 금지
      if (referenceNum >= 1) {
        onClick(PAGE_LENGTH * (referenceNum - 1) + 1);
      }
    } else {
      // 2. 우측 화살표 클릭
      // 최대 페이지 이내에서만 작동
      if (referenceNum < Math.ceil(maxPage / PAGE_LENGTH) - 1) {
        onClick(PAGE_LENGTH * (referenceNum + 1) + 1);
      }
    }
  };

  return (
    <div className="pagination">
      {Array(PAGE_LENGTH + 2)
        .fill()
        .map((item, i) => {
          // 화살표 버튼 생성
          if (i === 0 || i === PAGE_LENGTH + 1) {
            return (
              <PaginationButton
                key={i}
                isArrow={true}
                index={i}
                onClick={handleArrowClick}
              />
            );
            // 숫자 버튼 생성
          } else {
            if (PAGE_LENGTH * referenceNum + i > maxPage) {
              return <Fragment key={i}></Fragment>;
              // 최대 페이지 개수만큼만 버튼 생성
            } else {
              return (
                <PaginationButton
                  key={i}
                  index={PAGE_LENGTH * referenceNum + i}
                  currentPage={currentPage}
                  onClick={handleNumberClick}
                />
              );
            }
          }
        })}
    </div>
  );
}

export default Pagination;