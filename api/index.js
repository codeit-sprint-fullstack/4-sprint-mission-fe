import axios from "axios";

const baseURL = "https://panda-market-api.vercel.app";

const pandaClient = axios.create({
  baseURL,
});

const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) => {
  const url = `/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const response = await pandaClient.get(url);
  const data = response.data;

  return data;
};

const getArticles = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) => {
  const url = `/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const response = await pandaClient.get(url);
  const data = response.data;

  return data;
};

const getArticle = async (articleId) => {
  const url = `/articles/${articleId}`;
  const response = await pandaClient.get(url);
  const data = response.data;

  return data;
};

const api = {
  getProducts,
  getArticles,
  getArticle,
};

export default api;
