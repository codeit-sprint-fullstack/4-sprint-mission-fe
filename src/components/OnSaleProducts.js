// import Product from "./ProductList";
import "../images/search.png";
import "../styles/OnSaleProducts.css";
import "../images/emptyHeart.png";
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
    const limit = 10;
    const total = 0;
    getProducts({ total, page, pageSize, limit, sort: sortingType, keyword: input }) 
      .then((data) => {
        if (!data.products || !Array.isArray(data.products)) {
          throw new Error("Invalid products data");
        }
        setOnSaleProducts(data.products);

        data.products.forEach(product => {
          if (!product.images || !IsImage(product.images)) {
            product.images = noImageAvailable;
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
      product?.name?.toLowerCase().includes(input.trim().toLowerCase())
    );
    setFilteredProducts(filteredData);
  }, [input, onSaleProducts]);
  


  return (
    <div className="on-sale-products-container">
      {
        filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="on-sale-product-card" key={product._id}>
              <img className="on-sale-product-image" src={product.images || noImageAvailable} alt={product.name} />
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
          <p>검색 결과가 없습니다.</p> 
        )
      }
    </div>
  );
  
}

export default OnSaleProducts;