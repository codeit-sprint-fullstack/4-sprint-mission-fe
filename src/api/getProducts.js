const BASE_URL = "https://backend-c2ut.onrender.com";


export async function getProducts(
    { 
    offset = 0, 
    limit = 10, 
    page = 1, 
    sort = "recent",
    keyword = "",
}
) {
  const query = `offset=${offset}&limit=${limit}&page=${page}&sort=${sort}&search=${keyword}`;
  const response = await fetch(`${BASE_URL}/products?${query}`);
  const data = await response.json();
  
  return data;
}

export default getProducts;