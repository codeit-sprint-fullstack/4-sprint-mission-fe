import "./SearchBar.css";
import {useState, useEffect} from "react";

const search = require("../images/search.png");

export function SearchBar({ onSearch }) {
    const [keyword, setKeyword] = useState("");

    const handleKeywordChange = (e) => {
      const value = e.target.value;
      setKeyword(value);
      onSearch(value);
    }

    useEffect(() => {
      console.log(keyword);
    }, [keyword]);

  return (
    <div className="search-container">
            <img className="search-icon" src={search} alt="search"></img>
            <input
              onChange={handleKeywordChange}
              placeholder="검색할 상품을 입력해주세요."
              className="search-input"
              value = {keyword}
            ></input>
    </div>
  );
}

export default SearchBar;