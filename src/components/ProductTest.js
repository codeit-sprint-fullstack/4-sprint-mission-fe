import React, { useEffect } from "react";
import getProducts from "../api/getProducts"; 


function ProductTest() {
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts({
          offset: 0,
          limit: 5,
          page: 1,
          pageSize: 5,
          sort: "recent", 
        });
        console.log("Fetched products:", products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return <div>Check console for product data</div>;
}

export default ProductTest;
