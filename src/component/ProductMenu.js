import { useState } from "react";
import "./ProductMenu.css";
import { Link } from "react-router-dom";
export const ProductMenu = ({
  handleOrderChange,
  handleKeywordChange,
  loading,
}) => {
  const [value, setValue] = useState("");

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    handleOrderChange(e.target.value);
  };
  const handleButton = (e) => {
    e.preventDefault();
    handleKeywordChange(value);
  };

  return (
    <div>
      <div className="menuSection">
        <div className="menuContainer">
          <h3>판매중인 상품</h3>
          <div className="menu">
            <form className="inputWrapper" onSubmit={handleButton}>
              <input
                className="menuInput"
                name="content"
                placeholder="검색할 상품을 입력해주세요"
                value={value}
                onChange={handleValueChange}
              />
              <button type="submit" className="menuButton" />
            </form>
            <Link to="/registration" className="register button">
              상품 등록하기
            </Link>
            <select
              disabled={loading}
              className="orderSelect"
              onChange={handleSelectChange}
            >
              <option value="recent">최신순</option>
              <option value="favorite">좋아요순</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
