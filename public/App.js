const BASE_URL = "https://panda-market-api.vercel.app";

export const getProducts = async ({
  page = 1,
  pageSize = 4,
  orderBy = "",
  keyword = "",
}) => {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const res = await fetch(`${BASE_URL}/products?${query}`);

  if (!res.ok) {
    throw new Error("상품 목록 조회에 실패하였습니다");
  }
  const data = await res.json();

  return data;
};