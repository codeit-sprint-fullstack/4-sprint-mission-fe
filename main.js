import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";

import {
  getProduct,
  getProductList,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";


//제대로 동작하는지 확인
const data = await getArticleList({ page=1, pageSize=10, keyword=수정 });
console.log(getArticleList);

