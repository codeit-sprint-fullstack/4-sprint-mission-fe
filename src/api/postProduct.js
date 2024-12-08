const BASE_URL = 'https://backend-c2ut.onrender.com';


export async function postProduct(
    { 
    offset = 0, 
    limit = 10, 
    page = 1, 
    sort = 'recent',
    keyword = "",
}
) {
  const query = `offset=${offset}&limit=${limit}&page=${page}&sort=${sort}&search=${keyword}`;
  const response = await fetch(`${BASE_URL}/products?${query}`);
  const data = await response.json();

  const editQuery = `offset=${offset}&limit=${limit}&page=2&sort=${sort}&search=${keyword}`
  const editResponse = await fetch(`${BASE_URL}/products?${editQuery}`);
  const editData = await editResponse.json();

  console.log(editData)
  
  return data;
}

export default postProduct;