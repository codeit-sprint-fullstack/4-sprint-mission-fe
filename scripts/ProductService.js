import axios from 'axios';
/*
 * 공통 URL 및 API 기타 설정등을 관리 하는것으로 변경 함.
 * instance로 패스 baseURL만 설정
 *
 * export const API_HOST =
 * process.env['API_HOST'] ?? 'https://sprint-mission-api.vercel.app';
 */
import { API_HOST } from '../constant/constant.js';
const BASE_URL = `${API_HOST}`;

const instance = axios.create({
  baseURL: `${BASE_URL}/products`,
  timeout: 3000,
});
// error 처리
const handleError = (error) => {
  if (error.response) {
    const errorMsg = `[StatusCode ${error.response.status}] ${error.response.data.message}`;
    console.error(errorMsg);
    throw new Error(
      `[StatusCode ${error.response.status}] ${error.response.data.message}`
    );
    throw error;
  }
};
// 리스트조회
export async function getProductList(page = 1, pageSize = 10, keyword = '') {
  try {
    const response = await instance.get('', {
      params: { page, pageSize, keyword },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
// 제품조회
export async function getProduct(productID) {
  try {
    const response = await instance.get(`${productID}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
// 제품등록
export async function createProduct(
  name,
  description,
  price,
  manufacturer,
  tags,
  images
) {
  try {
    const response = await instance.post('', {
      name,
      description,
      price,
      manufacturer,
      tags,
      images,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//제품수정
export async function patchProduct(
  name,
  description,
  price,
  manufacturer,
  tags,
  images
) {
  try {
    const response = await instance.post(`${productID}`, {
      name,
      description,
      price,
      tags,
      images,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
//제품삭제
export async function deleteProduct(productID) {
  try {
    const response = await instance.delete(`${productID}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
