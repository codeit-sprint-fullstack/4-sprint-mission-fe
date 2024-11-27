import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});

export const getProducts = async ({
  page = 1,
  pageSize = 4,
  orderBy = "",
  keyword = "",
}) => {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const res = await instance.get(`/products?${query}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await instance.post("/products", productData);
  return res.data;
};
