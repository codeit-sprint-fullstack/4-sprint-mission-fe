import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from "./ArticleService.js";

// const articles = await getArticleList({ page: 1, pageSize: 10, keyword: '안녕' });

const article = await getArticle(1049);
console.log(article);

// const arti = {
//   title: "조형민 아티클",
//   content: "코드잇 스프린트 최고!!",
//   image: "이미지는 뭐지.png",
// };
// const newArticle = await createArticle(arti);
// console.log(newArticle);

// const arti = {
//   title: "조형민 아티클 수정본",
//   content: "코드잇 스프린트 최고!!",
//   image: "이미지는 뭐지.png",
// };
// const patch = await patchArticle(1049, arti);

// const deleteA = await deleteArticle(1050);
// console.log(deleteA);