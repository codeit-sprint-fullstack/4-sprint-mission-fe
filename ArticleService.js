import axios from "axios";
import { PrintError } from "./PrintError";

const instance = axios.create({
  baseURL: "https://sprint-mission-api.vercel.app/",
  timeout: 3000,
});

export function getArticleList(params = {}) {
  instance
    .get("/articles", { params })
    .then((res) => console.log(res.data))
    .catch((e) => PrintError(e));
}

export function getArticle(id) {
  instance
    .get(`/articles/${id}`)
    .then((res) => console.log(res.data))
    .catch((e) => PrintError(e));
}

export function createArticle(article) {
  instance
    .post("/articles", article)
    .then((res) => console.log(res.data))
    .catch((e) => PrintError(e));
}

export function patchArticle(id, article) {
  instance
    .patch(`/articles/${id}`, article)
    .then((res) => console.log(res.data))
    .catch((e) => PrintError(e));
}

export function deleteArticle(id) {
  instance
    .delete(`/articles/${id}`)
    .then((res) => console.log(res.data))
    .catch((e) => PrintError(e));
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

// export function getArticle(id) {
//   fetch(`https://sprint-mission-api.vercel.app/articles/${id}`)
//     .then((response) => response.json())
//     .then((data) => { console.log(data); });
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
