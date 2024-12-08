// import Product from "./ProductList";
import "../images/search.png";
<<<<<<< HEAD
import "./OnSaleProducts.css";
import "../images/empty_heart.png";
=======
import "../styles/OnSaleProducts.css";
import "../images/emptyHeart.png";
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)
import { useState, useEffect } from "react";
import getProducts from "../api/getProducts";
import IsImage from "../utils/image.helper";

const noImageAvailable = require("../images/noImageAvailable.png");
const emptyHeart = require("../images/emptyHeart.png");

export function OnSaleProducts({ sort, page, keyword }) {

  const [onSaleProducts, setOnSaleProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [input, setInput] = useState(keyword || "");
  const [sortingType, setSortingType] = useState(sort || "recent");

  useEffect(() => {
    const pageSize = input ? 10000 : 10;
    getProducts({ page, pageSize, sort: sortingType, keyword: input }) 
      .then((data) => {
<<<<<<< HEAD
        setOnSaleProducts(data.list);
        data.list.forEach(product => {
          if (!IsImage(String(product.images))) {
            product.images = no_image_available;
=======
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid products data");
        }
        setOnSaleProducts(data.products);

        data.products.forEach(product => {
          if (!product.images || !IsImage(product.images)) {
            product.images = noImageAvailable;
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)
          }
        });
      })
      .catch((error) => console.error("Error fetching on-sale products:", error));
  }, [input, page, sortingType]);

  useEffect(() => {
    setInput(keyword);
  }, [keyword]);

  useEffect(() => {
    setSortingType(sort);
  }, [sort]);

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
<<<<<<< HEAD
            <div className="on-sale-product-card" key={product.id}>
              <img className="on-sale-product-image" src={product.images || no_image_available} alt={product.name} />
=======
            <div className="on-sale-product-card" key={product._id}>
              <img className="on-sale-product-image" src={product.images || noImageAvailable} alt={product.name} />
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)
              <div className="on-sale-product-info">
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()}원</p>
                <div className="on-sale-product-favorite">
                  <button className="on-sale-favorite-button">
                    <img src={emptyHeart} alt="favorite"></img>
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