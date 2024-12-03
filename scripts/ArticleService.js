import fetch from 'node-fetch';
/**
 * export const API_HOST =
 * process.env['API_HOST'] ?? 'https://sprint-mission-api.vercel.app';
 */
import { API_HOST } from '../constant/constant.js';

/**
 * 미해결 부븐을 참고자료를 통해 학습하고
 * 공통 에러처리부분을 상수로 처리
 */
const normalizeFetchResult = (response) => {
  if (response.status === 204) {
    return {
      isSuccessful: response.ok,
      status: response.status,
      payload: null,
    };
  }
  return response.json().then((payload) => ({
    isSuccessful: response.ok,
    status: response.status,
    payload,
  }));
};

const handleNormalizedFetchResult = (fetchResult) => {
  if (!fetchResult.isSuccessful) {
    const errorMessage = `[StatusCode ${fetchResult.status}] ${fetchResult.payload.message}`;
    throw new Error(errorMessage);
  }
  return fetchResult.payload;
};

const handleError = (error) => {
  console.error(error.message);
  throw error;
};
// 글목록 조회
export function getArticleList(page, pageSize, keyword) {
  return fetch(
    `${API_HOST}/articles/?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  )
    .then(normalizeFetchResult)
    .then(handleNormalizedFetchResult)
    .catch(handleError);
}
// 글 조회
export function getArticle(articleId) {
  return fetch(`${API_HOST}/articles/${articleId}`)
    .then(normalizeFetchResult)
    .then(handleNormalizedFetchResult)
    .catch(handleError);
}
// 글생성
export function createArticle(title, content, image) {
  return fetch(`${API_HOST}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then(normalizeFetchResult)
    .then(handleNormalizedFetchResult)
    .catch(handleError);
}
//글 수정
export function patchArticle(articleId, title, content, image) {
  return fetch(`${API_HOST}/articles/${articleId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  })
    .then(normalizeFetchResult)
    .then(handleNormalizedFetchResult)
    .catch(handleError);
}
//글 삭제
export function deleteArticle(articleId) {
  return fetch(`${API_HOST}/articles/${articleId}`, {
    method: 'DELETE',
  })
    .then(normalizeFetchResult)
    .then(handleNormalizedFetchResult)
    .catch(handleError);
}

// getArticleList(1, 10, '');
