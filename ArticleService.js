import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sprint-mission-api.vercel.app/',
  timeout: 3000,
});

export async function getArticleList(params = {}) {
  const res = await instance.get('/articles', { params });
  return res.data;
}

export async function getArticle(id) {
  const res = await instance.get(`/articles/${id}`);
  return res.data;
}

export async function createArticle(article) {
  const res = await instance.post('/articles', article);
  return res.data;
}

export async function patchArticle(id, article) {
  const res = await instance.patch(`/articles/${id}`, article);
  return res.data;
}

export async function deleteArticle(id) {
  const res = await instance.delete(`/articles/${id}`);
  return res.data;
}


/* fetch로 구현 연습 */
// export async function getArticleList(params = {}) {
//   const url = new URL('https://sprint-mission-api.vercel.app/articles');
//   Object.keys(params).forEach(element => {
//     url.searchParams.append(element, params[element]);
//   });

//   const res = await fetch(url);
//   const data = await res.json();
//   return data;

// }

// export async function getArticle(id) {
//   const res = await fetch(`https://sprint-mission-api.vercel.app/articles/${id}`);
//   const data = await res.json();
//   return data;
// }

// export async function createArticle(article) {
//   const res = fetch('https://sprint-mission-api.vercel.app/articles', {
//     method: 'POST',
//     body: JSON.stringify(article),
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   });
//   const data = (await res).json();
//   return data;

// }