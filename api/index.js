import config from "@/postcss.config.mjs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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

const createCommentInArticle = async (id, content) => {
  const url = `/article/${id}/comment`;
  const response = await client.post(url, { content });
  const data = response.data;
  return data;
};

const getCommentsinArticle = async (id) => {
  const url = `article/${id}/comments`;
  const response = await client.get(url);
  const data = response.data;
  return data;
};

const deleteCommentInArticle = async (id) => {
  const url = `article/${id}/comment`;
  const response = await client.delete(url);
  const data = response.data;
  return data;
};

const patchCommentInArticle = async (id, content) => {
  const url = `article/${id}/comment`;
  const response = await client.patch(url, { content });
  const data = response.data;
  return data;
};

// 상품 관련 api
const getProducts = async () => {
  const url = "/products";
  const response = await client.get(url);
  const data = response.data;
  return data;
};

// 로그인 관련 api
const codeitURL = "https://panda-market-api.vercel.app";

export const codeitClient = axios.create({
  baseURL: codeitURL,
});

codeitClient.interceptors.request.use(async (config) => {
  if (config.url === "/auth/refresh-token") return config;
  const Authorization = config.headers.Authorization || "";
  const accessToken = Authorization.split("Bearer ")[1];

  if (!accessToken) return config;

  const { exp } = jwtDecode(accessToken);
  if (exp * 1000 >= Date.now()) return config;

  const prevRefreshToken = localStorage.getItem("refreshToken");
  const { accessToken: newAccessToken } = await api.refreshToken(
    prevRefreshToken
  );
  config.headers.Authorization = `Bearer ${newAccessToken}`;

  return config;
});

const signUp = async (dto) => {
  const url = "/auth/signUp";
  const response = await codeitClient.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;
  codeitClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);
  return data;
};

const logIn = async (dto) => {
  const url = "/auth/signIn";
  const response = await codeitClient.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;
  codeitClient.defaults.headers.Authorization = `Bearer ${accessToken}`;
  localStorage.setItem("refreshToken", refreshToken);

  return data;
};

const refreshToken = async (prevRefreshToken) => {
  const url = "/auth/refresh-token";
  const response = await codeitClient.post(url, {
    refreshToken: prevRefreshToken,
  });
  const data = response.data;
  const { accessToken } = data;
  codeitClient.defaults.headers.Authorization = `Bearer ${accessToken}`;

  return data;
};

// 유저정보 관련
const getUserData = async () => {
  const url = "/users/me";
  const response = await codeitClient.get(url);
  const data = response.data;
  return data;
};

// product
const getProduct = async (productId) => {
  const url = `/products/${productId}`;
  const response = await codeitClient.get(url);
  const data = response.data;
  return data;
};

const deleteProduct = async (productId) => {
  const url = `/products/${productId}`;
  const response = await codeitClient.delete(url);
  const data = response.data;
  return data;
};

const patchProduct = async (productId, dto) => {
  const url = `/products/${productId}`;
  const response = await codeitClient.patch(url, dto);
  const data = response.data;
  return data;
};

const getCommentsInProduct = async (productId, limit = 10) => {
  const options = {
    params: {
      limit,
    },
  };
  const url = `/products/${productId}/comments`;
  const response = await codeitClient.get(url, options);
  const data = response.data;
  return data;
};

const deleteCommentInProduct = async (commentId) => {
  const url = `/comments/${commentId}`;
  const response = await codeitClient.delete(url);
  const data = response.data;
  return data;
};

const patchCommentInProduct = async (commentId, content) => {
  const url = `/comments/${commentId}`;
  const response = await codeitClient.patch(url, { content });
  const data = response.data;
  return data;
};

const createCommentInProduct = async (productId, content) => {
  const url = `/products/${productId}/comments`;
  const response = await codeitClient.post(url, { content });
  const data = response.data;
  return data;
};

const createFavoriteProduct = async (productId) => {
  const url = `/products/${productId}/favorite`;
  const response = await codeitClient.post(url);
  const data = response.data;
  return data;
};

const deleteFavoriteProduct = async (productId) => {
  const url = `/products/${productId}/favorite`;
  const response = await codeitClient.delete(url);
  const data = response.data;
  return data;
};

const api = {
  getArticles,
  getArticle,
  createArticle,
  deleteArticle,
  patchArticle,
  createCommentInArticle,
  getCommentsinArticle,
  deleteCommentInArticle,
  patchCommentInArticle,
  getProducts,
  signUp,
  logIn,
  refreshToken,
  getUserData,
  getProduct,
  deleteProduct,
  patchProduct,
  getCommentsInProduct,
  deleteCommentInProduct,
  patchCommentInProduct,
  createCommentInProduct,
  createFavoriteProduct,
  deleteFavoriteProduct,
};

export default api;
