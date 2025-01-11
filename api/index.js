import axios from 'axios';

const baseURL = 'http://localhost:5200';

const client = axios.create({
  baseURL,
});

const getArticles = async ({ limit = 10, sort = 'recent', skip = 0 }) => {
  const query = `limit=${limit}&sort=${sort}&skip=${skip}`;
  const url = `/articles?${query}`;
  // const url = `/articles?limit=3`;
  const res = await client.get(url);
  return res.data;
};

const api = {
  getArticles,
};

export default api;
