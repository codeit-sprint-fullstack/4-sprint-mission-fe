import axios from 'axios';

const baseURL = 'http://localhost:5500';

const client = axios.create({
  baseURL,
});

/**********************************************************************************
 * 게시글(article) 관련 API
 */
// 게시글 등록
const postArticle = async (articleData) => {
  const url = '/articles';
  const res = await client.post(url, articleData);
  return res.data;
};

// 게시글 수정
const editArticle = async (articleId, articleData) => {
  const url = `/articles/${articleId}`;
  const res = await client.patch(url, articleData);
  return res.data;
};

// 게시글 삭제
const deleteArticle = async (articleId) => {
  const url = `/articles/${articleId}`;
  const res = await client.delete(url);
  return res.data;
};

// 게시글 목록 조회
const getArticles = async ({
  limit = 10,
  sort = 'latest',
  skip = 0,
  keyword = '',
}) => {
  const params = { limit, sort, skip, keyword };
  const url = `/articles?`;
  const res = await client.get(url, { params });
  return res.data;
};

// 특정 id 게시글 조회
const getArticle = async (articleId) => {
  const url = `/articles/${articleId}`;
  const res = await client.get(url);
  return res.data;
};

/**********************************************************************************
 * 댓글(comments) 관련 API
 */

// 댓글 목록 조회 - 게시글
const getCommentsOfArticle = async (articleId, { limit = 3, cursor = '' }) => {
  const query = `limit=${limit}&cursor=${cursor}`;
  const url = `/articles/${articleId}/comments?${query}`;
  const res = await client.get(url);
  return res.data;
};

// 댓글 등록 - 게시글
const postArticleComment = async (articleId, commentData) => {
  const url = `/articles/${articleId}/comments`;
  const res = await client.post(url, commentData);
  return res.data;
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  const url = `/comments/${commentId}`;
  const res = await client.delete(url);
  return res.data;
};

// 댓글 수정
const editComment = async (commentId, commentData) => {
  const url = `/comments/${commentId}`;
  const res = await client.patch(url, commentData);
  return res.data;
};

/**********************************************************************************
 * 상품(product) 관련 API
 */
// 상품 목록 조회
const getProducts = async ({
  sort = 'latest',
  skip = 0,
  keyword = '',
  limit = 0,
}) => {
  const url = '/products';
  const res = await client.get(url, {
    params: {
      sort,
      skip,
      keyword,
      limit,
    },
  });
  return res.data;
};

// 상품 등록
const postProduct = async (productData) => {
  const url = '/products';
  const res = await client.post(url, productData);
  return res.data;
};

// 상품 삭제
const deleteProduct = async (productId) => {
  const url = `/products/${productId}`;
  const res = await client.delete(url);
  return res.data;
};

// 상품 수정
const editProduct = async (productId, productData) => {
  const url = `/products/${productId}`;
  const res = await client.patch(url, productData);
  return res.data;
};

const api = {
  getArticles,
  getArticle,
  postArticle,
  editArticle,
  deleteArticle,
  getCommentsOfArticle,
  postArticleComment,
  deleteComment,
  editComment,
  getProducts,
  postProduct,
  deleteProduct,
  editProduct,
};

export default api;
