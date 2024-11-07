import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";

/* ----- 작동 테스트 ------ */

// getArticleList({ page: 1, pageSize: 10, keyword: '안녕' });

getArticle(1049);

// const arti = {
//   title: "조형민 아티클",
//   content: "코드잇 스프린트 최고!!",
//   image: "이미지는 뭐지.png",
// };
// createArticle(arti);

// const arti = {
//   title: "조형민 아티클 수정본",
//   content: "코드잇 스프린트 최고!!",
//   image: "이미지는 뭐지.png",
// };
// patchArticle(1051, arti);

// deleteArticle(1051);