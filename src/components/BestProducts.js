import { useEffect, useState } from "react";
import "../styles/BestProducts.css";
import { getProducts } from "../api/getProducts";
import "../images/emptyHeart.png";
import IsImage from "../utils/image.helper";
import "../images/noImageAvailable.png";

export function BestProducts() {

  const emptyHeart = require("../images/emptyHeart.png");
  const noImageAvailable = require("../images/noImageAvailable.png");


  const [bestProducts, setBestProducts] = useState([]);


  useEffect(() => {
    
    getProducts({ pageSize: 4, sort: "favorite" }) 
      .then((data) => {
        setBestProducts(data.list);
        data.list.forEach(product => {
          if (!IsImage(String(product.images))) {
            product.images = noImageAvailable;
          }
        });
      })
      .catch((error) => console.error("Error fetching best products:", error));
  }, []);

  return (
    <div className="best-products-container">
      {
        bestProducts.map((product) => (
          <div className="best-product-card" key={product.id}>
            <img className="best-product-image"src={product.images} alt={product.name} />
            <div className="best-product-info">
              <h3>{product.name}</h3>
              <p>{product.price.toLocaleString()}원</p>
              <div className="best-product-favorite">
                <button className="best-favorite-button">
                  <img src={emptyHeart} alt="favorite"></img>
                </button>
                <h5>{product.favoriteCount}</h5>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default BestProducts;
