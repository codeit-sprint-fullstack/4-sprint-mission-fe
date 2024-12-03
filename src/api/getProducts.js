const BASE_URL = 'https://panda-market-api.vercel.app/products';


export async function getProducts(
    { 
    offset = 0, 
    limit = 10, 
    page = 1, 
    pageSize = 10, 
    sort = 'recent' 
}
) {
  const query = `offset=${offset}&limit=${limit}&page=${page}&pageSize=${pageSize}&orderBy=${sort}`;
  const response = await fetch(`${BASE_URL}?${query}`);
  const data = await response.json();

  console.log("Fetched products:", data);
  
  return data;
}

export default getProducts;