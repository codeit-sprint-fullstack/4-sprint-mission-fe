import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './ArticleService.js';

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './ProductService.js';


// Article 작동테스트 //
getArticleList(1, 10, "새")
  .then((data) => {console.log("Article List:", data)});

getArticle(189);

createArticle("New title", "New content", "New image");

patchArticle(142, {title: "안녕"});

deleteArticle(130);


// Product 작동테스트 //
getProductList(1, 5, "초콜릿")
  .then((productList) => console.log("Product List", productList));

getProduct(63);

createProduct("New name", "New description", "1000000", "New tags", "New images");

patchProduct(42, {name: "Patch name"})

deleteProduct(130);
