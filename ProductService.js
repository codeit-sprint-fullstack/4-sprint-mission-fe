import axios from "axios";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/",
  timeout: 3000,
});

export async function getProductList(params = {}) {
  try {
    const res = await instance.get("/products", { params });
    return res.data;
  } catch (e) {
    console.log(
      `status: ${e.response.status}\nmessage: ${e.response.data.message}`
    );
  }
}

export async function getProduct(id) {
  try {
    const res = await instance.get(`/products/${id}`);
    return res.data;
  } catch (e) {
    console.log(
      `status: ${e.response.status}\nmessage: ${e.response.data.message}`
    );
  }
}

export async function createProduct(product) {
  try {
    const res = await instance.post("/products", product);
    return res.data;
  } catch (e) {
    console.log(
      `status: ${e.response.status}\nmessage: ${e.response.data.message}`
    );
  }
}

export async function patchProduct(id, product) {
  try {
    const res = await instance.patch(`/products/${id}`, product);
    return res.data;
  } catch (e) {
    console.log(
      `status: ${e.response.status}\nmessage: ${e.response.data.message}`
    );
  }
}

export async function deleteProduct(id) {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res.data;
  } catch (e) {
    console.log(
      `status: ${e.response.status}\nmessage: ${e.response.data.message}`
    );
  }
}
