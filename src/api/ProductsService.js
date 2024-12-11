// const BASE_URL = "https://panda-market-api.vercel.app/products";
const BASE_URL = "https://four-sprint-mission-be-cfjg.onrender.com";

export const getProductList = async ({
  page = 1,
  pageSize = 100,
  keyword = "",
  order = "favorite",
}) => {
  try {
    if (!Number.isInteger(page) || page < 1) {
      throw new Error("Invalid page");
    }
    if (!Number.isInteger(pageSize) || pageSize < 1) {
      throw new Error("Invalid pageSize");
    }
    const res = await fetch(
      `${BASE_URL}/products?page=${page}&pageSize=${pageSize}&keyword=${keyword}&orderBy=${order}`,
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

export const createProduct = async ({ name, description, price, tags }) => {
  try {
    if (!Array.isArray(tags)) {
      throw new Error("Invalid tags");
    }
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        tags,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }
    return await res.json();
  } catch (e) {
    console.log(e.message);
  }
};
