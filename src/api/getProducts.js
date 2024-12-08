<<<<<<< HEAD
const BASE_URL = 'https://panda-market-api.vercel.app/products';
=======
const BASE_URL = "https://backend-c2ut.onrender.com";
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)


export async function getProducts(
    { 
    offset = 0, 
    limit = 10, 
    page = 1, 
<<<<<<< HEAD
    pageSize = 10, 
    sort = 'recent',
=======
    sort = "recent",
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)
    keyword = "",
}
) {
  const query = `offset=${offset}&limit=${limit}&page=${page}&pageSize=${pageSize}&orderBy=${sort}&keyword=${keyword}`;
  const response = await fetch(`${BASE_URL}?${query}`);
  const data = await response.json();
<<<<<<< HEAD

  console.log("Fetched products:", data);
=======
>>>>>>> 0f1a9c4 (refactor: sprint5 코멘트 반영)
  
  return data;
}

export default getProducts;