import './App.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BestProducts from './BestProducts';
import { OnSaleProducts } from './OnSaleProducts';
import { useState } from 'react';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import DropDown from './DropDown';

function App() {

  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("recent");

  const options = ["최신순", "좋아요순"];

  const handleSelect = (newOption) => {
    if (newOption === "최신순") {
      newOption = "recent";
      setSelectedOption(newOption);
    } else if (newOption === "좋아요순") {
      newOption = "favorite";
      setSelectedOption(newOption);
    }
    console.log(newOption);
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
  }

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  return (
    
    <div className="header">
      <NavBar />
      <div className="main">
        <div className="best-top-bar">
          <h2 className="best-product-title">베스트 상품</h2>
        </div>
        <BestProducts />
        <div className="on-sale-top-bar">
          <h2 className="on-sale-product-title">판매중인 상품</h2>
          <div className="tool-bar">
            <SearchBar onSearch={handleSearch}/>
          <button className="register-product">상품 등록하기</button>
          <DropDown options={options} onSelect={handleSelect}></DropDown>
          </div>
        </div>
        <OnSaleProducts sort={selectedOption} page={page} keyword={searchKeyword} />
        <div>
          <Pagination onPageChange={handlePageChange}></Pagination>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
  
}


export default App;
