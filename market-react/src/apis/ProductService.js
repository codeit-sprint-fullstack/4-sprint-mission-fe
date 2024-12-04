import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500",
  // baseURL: "https://four-sprint-mission-fe-1.onrender.com",
  timeout: 3000,
});

export const getProducts = async ({
  sort = "recent",
  offset = 0,
  keyword = "",
  limit = 0,
}) => {
  const query = `sort=${sort}&offset=${offset}&keyword=${keyword}&limit=${limit}`;
  const res = await instance.get(`/products?${query}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await instance.post("/products", productData);
  // eslint-disable-next-line no-restricted-globals
  location.href("/");
  return res.data;
};