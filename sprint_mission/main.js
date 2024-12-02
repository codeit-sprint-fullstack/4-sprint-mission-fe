import { getArticleList, getArticle, createArticle, patchArticle, deleteArticle } from './ArticleService.js';
import { getProductList, getProduct, createProduct, patchProduct, deleteProduct } from './ProductService.js';



// const requestData = {
//     title: "Sample title2",
//     content: "Sample content2",
//     image: "Sample image2",
// };

// getArticleList(3, 20, '');

// getArticle(1070);

// createArticle(requestData);

// patchArticle(1070, { title: 'Updated Article' });

// deleteArticle(1070);


// getProductList(2, 40, "");

// getProduct(197);

// getProduct(99999);

// createProduct({
//     name: "Test Product",
//     description: "This is a test product description.",
//     price: 99.99,
//     manufacturer: "electronics",
//     tags: ["string"],
//     images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
// });

// patchProduct(585, {
//     name: "Updated Product",
//     description: "This is a test product description.",
//     price: 99.99,
//     manufacturer: "electronics",
//     tags: ["string"],
//     images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
// });

// deleteProduct(585);

// deleteProduct(99999);