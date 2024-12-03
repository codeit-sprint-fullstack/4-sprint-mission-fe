import './App.css';
import NavBar from './NavBar';
import Footer from './Footer';
import BestProducts from './BestProducts';
import { OnSaleProducts } from './OnSaleProducts';
import Pagination from './Pagination';
import { useState } from 'react';
import { getProducts } from '../api/getProducts.js';
import ProductTest from './ProductTest';

function App() {
  
  const [order, setOrder] = useState("recent");

  const search = require("../images/search.png");

  // const products = 
  
  // const sortedProducts = products.sort((a, b) => b[order] - a[order]);

  // const handleNewestClick = () => {
  //   setOrder("recent");
  // }

  // const handleBestClick = () => {
  //   setOrder("favorite");
  // }

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
          <div className="search-container">
            <img className="search-icon" src={search} alt="search"></img>
            <input
              placeholder="검색할 상품을 입력해주세요."
              className="search-input"
            ></input>
          </div>
          <button className="register-product">상품 등록하기</button>
          <button className="dropdown-button">최신순 ▼</button>
          <ul className="dropdown-menu">
            <li>최신순</li>
            <li>좋아요순</li>
          </ul>
        </div>
        <OnSaleProducts />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
  
}

export default App;
