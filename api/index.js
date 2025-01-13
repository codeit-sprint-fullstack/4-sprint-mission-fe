import axios from 'axios';
import { comment } from 'postcss';

const baseURL = 'http://localhost:5200';

const client = axios.create({
  baseURL,
});

/**********************************************************************************
 * 게시글(article) 관련 API
 */

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

/**********************************************************************************
 * 댓글(comments) 관련 API
 */

// 댓글 등록 - 게시글
const postArticleComment = async (articleId, comment) => {
  const url = `/articles/${articleId}/comments`;
  const res = await client.post(url, comment);
  return res.data;
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  const url = `/comments/${commentId}`;
  const res = await client.delete(url);
  return res.data;
};

// 댓글 수정
const editComment = async (commentId, comment) => {
  console.log('do editcomment!!');
  const url = `/comments/${commentId}`;
  const res = await client.patch(url, comment);
  return res.data;
};

const api = {
  getArticles,
  getArticle,
  getCommentsOfArticle,
  postArticleComment,
  deleteComment,
  editComment,
};

export default api;
