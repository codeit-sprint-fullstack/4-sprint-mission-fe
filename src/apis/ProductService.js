import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500",
  timeout: 3000,
});

export const getProducts = async ({
  sort = "recent",
  offset = 0,
  keyword = "",
}) => {
  console.log("start getProducts");
  const query = `sort=${sort}&offset=${offset}&keyword=${keyword}`;
  const res = await instance.get(`/products?${query}`);
  console.log(`res.data:${res.data}`);
  console.log("end getProducts");
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await instance.post("/products", productData);
  return res.data;
};
