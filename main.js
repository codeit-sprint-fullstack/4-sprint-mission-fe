import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from "./ArticleService.js";
import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from "./ProductService.js";

/* --- ArticleService.js 작동 테스트 --- */

// getArticleList({ page: 1, pageSize: 10, keyword: '안녕' });

// getArticle(1049);

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

/* --- ProductService.js 작동 테스트 --- */

// console.log(await getProductList({ page: 10, pageSize: 5, keyword: '상품' }));

console.log(await getProduct(569));

// const product = {
//   name: "손난로",
//   description: "별로 안 따뜻해요",
//   price: 20000,
//   manufacturer: "made",
//   tags: ['겨울'],
//   images: ['손난로.png']
// };
// console.log(await createProduct(product));

// console.log(await patchProduct(569, product));

// console.log(await deleteProduct(569));
