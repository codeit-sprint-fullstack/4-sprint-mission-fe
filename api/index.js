import axios from 'axios';

// const baseURL = 'https://four-sprint-mission-be.onrender.com/';
const baseURL = 'https://panda-market-api.vercel.app';

// const baseURL = 'http://localhost:5500';

export const client = axios.create({
  baseURL,
});

function errorHandler(error) {
  console.log('AxiosError', error);
  if (error.response) {
    throw new Error(`${error.response.status}: ${error.response.data}`);
  } else {
    throw new Error(error, '요청에 실패하였습니다.');
  }
}

// ---------------- axios interceptors 설정하기
// request interceptor
// - headers에 accessToken 실어 보내기
client.interceptors.request.use(
  (config) => {
    let accessToken;
    if (typeof window !== 'undefined') {
      accessToken = localStorage.getItem('accessToken');
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor
// - 401 에러 시 refreshToken 요청(accessToken 재발급) 후 -에러가 발생한- 기존 요청을 재요청
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    if (statusCode === 401 && !originalRequest._retry) {
      console.log('토큰 만료');
      originalRequest._retry = true;
      let prevRefreshToken;
      if (typeof window !== 'undefined') {
        prevRefreshToken = localStorage.getItem('refreshToken');
      }
      if (!prevRefreshToken) {
        return;
      }
      const { accessToken } = await refreshToken(prevRefreshToken);
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
      }
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return client.request(originalRequest);
    }
    return Promise.reject(error);
  }
);

/**********************************************************************************
 * 게시글(article) 관련 API
 */
// 게시글 등록
const postArticle = async (articleData) => {
  try {
    const url = '/articles';
    const response = await client.post(url, articleData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 게시글 수정
const editArticle = async (articleId, articleData) => {
  try {
    const url = `/articles/${articleId}`;
    const response = await client.patch(url, articleData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 게시글 삭제
const deleteArticle = async (articleId) => {
  try {
    const url = `/articles/${articleId}`;
    const response = await client.delete(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  } //
};

// 게시글 목록 조회
const getArticles = async ({
  limit,
  sort = 'latest',
  skip = 0,
  keyword = '',
}) => {
  try {
    const params = { limit, sort, skip, keyword };
    const url = `/articles?`;
    const response = await client.get(url, { params });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 특정 id 게시글 조회
const getArticle = async (articleId) => {
  try {
    const url = `/articles/${articleId}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

/**********************************************************************************
 * 댓글(comments) 관련 API
 */

// panda 마켓 - cursor가 숫자, 그 외에는 ''
// 댓글 목록 조회 - 게시글
const getCommentsOfArticle = async (articleId, { limit = 3, cursor = 0 }) => {
  try {
    const query = `limit=${limit}&cursor=${cursor}`;
    const url = `/articles/${articleId}/comments?${query}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 댓글 등록 - 게시글
const postArticleComment = async (articleId, commentData) => {
  try {
    const url = `/articles/${articleId}/comments`;
    const response = await client.post(url, commentData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 댓글 삭제
const deleteComment = async (commentId) => {
  try {
    const url = `/comments/${commentId}`;
    const response = await client.delete(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 댓글 수정
const editComment = async (commentId, content) => {
  try {
    const url = `/comments/${commentId}`;
    const response = await client.patch(url, content);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// panda 마켓 - cursor가 숫자, 그 외에는 ''
// 댓글 목록 조회 - 상품
const getCommentsOfProduct = async (productId, { limit = 3, cursor = 0 }) => {
  try {
    const query = `limit=${limit}&cursor=${cursor}`;
    const url = `/products/${productId}/comments?${query}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 댓글 등록 - 상품
const postProductComment = async (productId, commentData) => {
  try {
    const url = `/products/${productId}/comments`;
    const response = await client.post(url, commentData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

/**********************************************************************************
 * 상품(product) 관련 API
 */
// 상품 목록 조회
const getProducts = async ({
  orderBy = 'recent',
  page = 1,
  keyword = '',
  pageSize = 0,
  // sort = 'latest',
  // skip = 0,
  // keyword = '',
  // limit = 0,
}) => {
  try {
    const url = '/products';
    const response = await client.get(url, {
      params: {
        orderBy,
        page,
        keyword,
        pageSize,
        // sort,
        // skip,
        // keyword,
        // limit,
      },
    });
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상품 조회
const getProduct = async (productId) => {
  try {
    const url = `/products/${productId}`;
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상품 등록
const postProduct = async (productData) => {
  try {
    const url = '/products';
    const response = await client.post(url, productData);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상품 삭제
const deleteProduct = async (productId) => {
  try {
    const url = `/products/${productId}`;
    const response = await client.delete(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상품 수정
const editProduct = async (productId, productData) => {
  // try {
  //   const url = `/products/${productId}`;
  //   const response = await client.patch(url, productData);
  //   throw new Error('일부러 낸 에러입니다.');
  //   // return response.data;
  // } catch (error) {
  //   errorHandler(error);
  // }
  const url = `/products/${productId}`;
  const response = await client.patch(url, productData);
  throw new Error('일부러 낸 에러입니다.');
};

// 상품에 좋아요 하기
const likeProduct = async (productId) => {
  try {
    const url = `/products/${productId}/favorite`;
    const response = await client.post(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

// 상품에 좋아요 취소하기
const unLikeProduct = async (productId) => {
  try {
    const url = `/products/${productId}/favorite`;
    const response = await client.delete(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
};

/**********************************************************************************
 * 회원(user) 관련 API
 */
// 회원 가입
const signUp = async (dto) => {
  const url = '/auth/signUp';
  const response = await client.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;
  // 로컬 스토리지에 토큰 저장
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return data;
  // try {
  //   const url = '/auth/signUp';
  //   const response = await client.post(url, dto);
  //   const data = response.data;

  //   const { accessToken, refreshToken } = data;
  //   // 로컬 스토리지에 토큰 저장
  //   localStorage.setItem('accessToken', accessToken);
  //   localStorage.setItem('refreshToken', refreshToken);

  //   return data;
  // } catch (error) {
  //   errorHandler(error);
  // }
};

// 로그인
const logIn = async (dto) => {
  const url = '/auth/signIn';
  const response = await client.post(url, dto);
  const data = response.data;

  const { accessToken, refreshToken } = data;
  // 로컬 스토리지에 토큰 저장
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return data;

  // !!! -- 중요 -- useMutation의 onError 콜백으로 error가 들어가려면 try catch를 제거해야 한다.
  // - try catch가 있을 경우 error가 onSuccess로 들어간다? (아직 확인 못 해봄) - 2025.01.27

  // try {
  //   const url = '/auth/signIn';
  //   const response = await client.post(url, dto);
  //   const data = response.data;

  //   const { accessToken, refreshToken } = data;
  //   // 로컬 스토리지에 토큰 저장
  //   localStorage.setItem('accessToken', accessToken);
  //   localStorage.setItem('refreshToken', refreshToken);

  //   return data;
  // } catch (error) {
  //   errorHandler(error);
  // }
};

// refreshToken
const refreshToken = async (prevRefreshToken) => {
  try {
    const url = '/auth/refresh-token';
    const response = await client.post(url, { refreshToken: prevRefreshToken });
    const data = response.data;

    return data;
  } catch (error) {
    errorHandler(error);
  }
};

// 유저 정보 요청
const getMe = async () => {
  try {
    const url = '/users/me';
    const response = await client.get(url);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
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
  getCommentsOfProduct,
  postProductComment,
  getProducts,
  getProduct,
  postProduct,
  deleteProduct,
  editProduct,
  likeProduct,
  unLikeProduct,
  signUp,
  logIn,
  refreshToken,
  getMe,
};

export default api;
