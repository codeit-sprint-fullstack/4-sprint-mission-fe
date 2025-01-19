import axios from "axios";

const baseURL = "https://four-sprint-mission-be.onrender.com";

const client = axios.create({
  baseURL,
});

const getProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) => {
  const url = `/products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const getArticles = async ({
  limit = 10,
  sort = "latest",
  skip = 0,
  keyword = "",
} = {}) => {
  const params = { limit, sort, skip, keyword };
  const url = `/articles?`;
  const res = await client.get(url, { params });

  return res.data.articles;
};

const getArticle = async (articleId) => {
  const url = `/articles/${articleId}`;
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const postArticle = async (articleData) => {
  const url = `/articles`;
  const response = await client.post(url, articleData);
  return response.data;
};

// 게시글 삭제
const deleteArticle = async (articleId) => {
  const url = `/articles/${articleId}`;
  const res = await client.delete(url);
  return res.data;
};

const editArticle = async (articleId, newArticle) => {
  const url = `/articles/${articleId}`;
  const res = await client.patch(url, newArticle);
  return res.data;
};

const getCommentsOfArticle = async ({ articleId, limit = 10, cursor = 0 }) => {
  const url = `/articles/${articleId}/commets?limit=${limit}&cursor=${cursor}`;
  const response = await client.get(url);
  const data = response.data;

  return data;
};

const api = {
  getProducts,
  getArticles,
  getArticle,
  getCommentsOfArticle,
  postArticle,
  deleteArticle,
  editArticle,
};

export default api;
