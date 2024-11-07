import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'https://sprint-mission-api.vercel.app/',
//   timeout: 3000,
// });

// export async function getArticleList(params = {}) {
//   const res = await instance.get('/articles', { params });
//   return res.data;
// }


/* fetch로 구현 연습 */
export async function getArticleList(params = {}) {
  const url = new URL('https://sprint-mission-api.vercel.app/articles');
  Object.keys(params).forEach(element => {
    url.searchParams.append(element, params[element]);
  });

  const res = await fetch(url);
  const data = await res.json();
  return data;

}