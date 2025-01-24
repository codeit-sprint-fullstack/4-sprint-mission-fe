import axios from "axios";

// const baseURL = "http://localhost:3100";
const baseURL = "https://four-sprint-mission-be-1.onrender.com";

const client = axios.create({
  baseURL,
});

// 게시글 관련 api
const getArticles = async (keyword = "", order = "recent") => {
  const options = {
    params: {
      keyword,
      orderBy: order,
    },
  };
  const url = `/article`;
  const response = await client.get(url, options);
  const data = response.data;
  return data;
};

const getArticle = async (id) => {
  const url = `/article/${id}`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const createArticle = async (newArticle) => {
  const url = `/article`;
  const response = await client.post(url, newArticle);
  const data = response.data;
  return data;
};

const deleteArticle = async (id) => {
  const url = `/article/${id}`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const patchArticle = async (id, article) => {
  const url = `/article/${id}`;
  const response = await client.patch(url, article);
  const data = response.data;
  return data;
};

const createComment = async (id, content) => {
  const url = `/article/${id}/comment`;
  const response = await client.post(url, { content });
  const data = response.data;
  return data;
};

const getComments = async (id) => {
  const url = `article/${id}/comments`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const deleteComment = async (id) => {
  const url = `article/${id}/comment`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const patchComment = async (id, content) => {
  const url = `article/${id}/comment`;
  const response = await client.patch(url, { content });
  const data = response.data;
  return data;
};

// 상품 관련 api
const getProduct = async () => {
  const url = "/products";
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const api = {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  patchArticle,
  createComment,
  getComments,
  deleteComment,
  patchComment,
  getProduct,
};

export default api;
