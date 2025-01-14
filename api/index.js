import axios from "axios";

const getProducts = async () => {
  const res = await axios("@/mock-data/products.json");
  const products = await res.json();

  console.log(products);

  return products;
};

const api = {
  getProducts,
};

export default api;
