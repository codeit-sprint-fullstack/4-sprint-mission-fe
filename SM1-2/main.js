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

(async () => {
  // Test ArticleService functions
  console.log('Articles List:', await getArticleList(1, 5, 'test'));

  const articleId = 164; // 유효한 article ID로 수정
  console.log('Single Article:', await getArticle(articleId));

  console.log(
      'Article Created:',
      await createArticle('New Title', 'Content of the article', 'image_url')
  );

  console.log(
      'Article Updated:',
      await patchArticle(articleId, { title: 'Updated Title' })
  );

  console.log('Article Deleted:', await deleteArticle(articleId));

  // Test ProductService functions
  console.log('Products List:', await getProductList(1, 5, 'keyword'));

  const productId = 124; // 유효한 product ID로 수정
  console.log('Single Product:', await getProduct(productId));

  console.log(
      'Product Created:',
      await createProduct(
          'New Product',
          'Description',
          100,
          ['tag1', 'tag2'],
          ['image_url']
      )
  );

  console.log(
      'Product Updated:',
      await patchProduct(productId, { name: 'Updated Product' })
  );

  console.log('Product Deleted:', await deleteProduct(productId));
})();
