import './App.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BestProducts from './BestProducts';
import { OnSaleProducts } from './OnSaleProducts';
import { useState } from 'react';
import SearchBar from './SearchBar';

function App() {

  const [searchKeyword, setSearchKeyword] = useState("");

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
          <button className="dropdown-button">최신순 ▼</button>
          <ul className="dropdown-menu">
            <li>최신순</li>
            <li>좋아요순</li>
          </ul>
          </div>
        </div>
        <OnSaleProducts keyword={searchKeyword} />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
  
}

export default App;
