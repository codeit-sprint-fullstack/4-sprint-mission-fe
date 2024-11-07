import { getArticleList, getArticle } from "./ArticleService.js";

const articles = await getArticleList({ page: 1, pageSize: 10, keyword: '안녕' });

const article = await getArticle(131);

console.log(article);