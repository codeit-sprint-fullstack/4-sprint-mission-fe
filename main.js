import { getArticleList } from "./ArticleService.js";

const test = await getArticleList({ page: 1, pageSize: 10, keyword: '안녕' });

console.log(test);