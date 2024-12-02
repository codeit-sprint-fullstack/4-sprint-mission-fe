import React from "react";

const BestProducts = ({ products }) => (
  <section className="best-products">
    <h2>베스트 상품</h2>
    <div className="product-grid">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.price}원</p>
        </div>
      ))}
    </div>
  </section>
);

export default BestProducts;