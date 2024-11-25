const BASE_URL = "https://sprint-mission-api.vercel.app/products";

export const getProduct = async (id) => {
  try {
    if (!id) {
      throw new Error("For 'id': Required field is not provided.");
    }
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const getProductList = async (
  page = 1,
  pageSize = 100,
  keyword = ""
) => {
  try {
    const res = await fetch(
      `${BASE_URL}?page=${page}&pageSize=${pageSize}&keyword=${keyword}`,
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

export const createProduct = async (
  name,
  description,
  price,
  manufacturer,
  tags,
  images
) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        price,
        manufacturer,
        tags,
        images,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
};
export const patchProduct = async (
  id,
  name,
  description,
  price,
  manufacturer,
  tags,
  images
) => {
  try {
    if (!id) {
      throw new Error("For 'id': Required field is not provided.");
    }
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        price,
        manufacturer,
        tags,
        images,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }
    return res.json();
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteProduct = async (id) => {
  try {
    if (!id) {
      throw new Error("For 'id': Required field is not provided.");
    }
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Error: response status is ${res.status}`);
    }
  } catch (e) {
    console.log(e.message);
  }
};
