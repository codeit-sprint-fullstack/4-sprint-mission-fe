import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500",
  timeout: 3000,
});

export const getProducts = async ({
  sort = "recent",
  offset = 0,
  keyword = "",
  limit = 0,
}) => {
  console.log("start getProducts");
  const query = `sort=${sort}&offset=${offset}&keyword=${keyword}&limit=${limit}`;
  const res = await instance.get(`/products?${query}`);
  console.log(`res.data:${res.data}`);
  console.log("end getProducts");
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await instance.post("/products", productData);
  return res.data;
};
