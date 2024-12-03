import React, { useEffect } from "react";
import getProducts from "../api/getProducts"; // getProducts 파일 경로를 맞게 설정하세요.

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
        console.error("Error fetching products:", error); // 에러 발생 시 출력
      }
    }
    fetchProducts();
  }, []);

  return <div>Check console for product data</div>;
}

export default ProductTest;
