const BASE_URL = "https://panda-market-api.vercel.app/products";
export const getProductList = async ({
  page = 1,
  pageSize = 100,
  keyword = "",
  order = "favorite",
}) => {
  try {
    const res = await fetch(
      `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${order}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
};
