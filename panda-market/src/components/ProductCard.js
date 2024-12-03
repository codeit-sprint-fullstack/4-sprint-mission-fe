import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '5px', width: '200px' }}>
      <p>{product.name}</p>
      <p>Likes: {product.favorite}</p>
    </div>
  );
};

export default ProductCard;