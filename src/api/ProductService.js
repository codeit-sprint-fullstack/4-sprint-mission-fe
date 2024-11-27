import axios from "axios";

const instance = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
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
