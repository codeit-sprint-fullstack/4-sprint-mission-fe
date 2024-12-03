// import Product from "./ProductList";
import "../images/empty_heart.png";
import "../images/search.png";
import "./OnSaleProducts.css";
import "../images/empty_heart.png";
import { useState, useEffect } from "react";
import getProducts from "../api/getProducts";
import IsImage from "./IsImage";

const no_image_available = require("../images/no-image-available.png");
const empty_heart = require("../images/empty_heart.png");

// TO-DO
// 만약 src에 이미지 파일이 아닌 다른 파일이 들어오면 default 이미지로 대체
// 이미지 파일인지 확인하는 함수
// function checkImage(src) {
//   return image_check.includes(src.split('.').pop()); }
//  reset.css 적용 이후 디자인 전반적인 수정 필요

export function OnSaleProducts({ keyword }) {

  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [input, setInput] = useState(keyword || "");

  useEffect(() => {
    const pageSize = input ? 10000 : 10;
    getProducts({ pageSize, sort: "recent", keyword: input }) 
      .then((data) => {
        setOnSaleProducts(data.list);
        data.list.forEach(product => {
          if (!IsImage(String(product.images))) {
            product.images = no_image_available;
          }
        });
      })
      .catch((error) => console.error("Error fetching on-sale products:", error));
  }, [input]);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  useEffect(() => {
    const filteredData = onSaleProducts.filter((product) =>
      product.name.toLowerCase().includes(input.trim().toLowerCase())
    );
    setFilteredProducts(filteredData);
  }, [input, onSaleProducts]);
  


  return (
    <div className="on-sale-products-container">
      {
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="on-sale-product-card" key={product.id}>
              <img className="on-sale-product-image" src={product.images || no_image_available} alt={product.name} />
              <div className="on-sale-product-info">
                <h3>{product.name}</h3>
                <p>{product.price}원</p>
                <div className="on-sale-product-favorite">
                  <button className="on-sale-favorite-button">
                    <img src={empty_heart} alt="favorite"></img>
                  </button>
                  <h5>{product.favoriteCount}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>  // 필터링된 결과가 없으면 표시
        )
      }
    </div>
  );
  
}

export default OnSaleProducts;