import axios from 'axios';

const baseURL = 'http://localhost:5200';

const client = axios.create({
  baseURL,
});

// 게시글 목록 조회
const getArticles = async ({
  limit = 10,
  sort = 'latest',
  skip = 0,
  keyword = '',
}) => {
  const query = `limit=${limit}&sort=${sort}&skip=${skip}&keyword=${keyword}`;
  const url = `/articles?${query}`;
  // const url = `/articles?limit=3`;
  const res = await client.get(url);
  return res.data;
};

// 특정 id 게시글 조회
const getArticle = async (articleId) => {
  const url = `/articles/${articleId}`;
  const res = await client.get(url);
  return res.data;
};

const getCommentsOfArticle = async (articleId, { limit = 3, cursor = '' }) => {
  const query = `limit=${limit}&cursor=${cursor}`;
  const url = `/articles/${articleId}/comments?${query}`;
  const res = await client.get(url);
  return res.data;
};

const api = {
  getArticles,
  getArticle,
  getCommentsOfArticle,
};

export default api;
