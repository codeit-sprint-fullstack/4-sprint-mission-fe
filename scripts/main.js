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

// 게시글 목록 조회 테스트
getArticleList(1, 10, '')
  .then((articles) => {
    console.log('게시글 목록:', articles);
  })
  .catch((error) => {
    console.error('게시글 목록 조회 실패:', error);
  });

// 단일 게시글 조회 테스트
getArticle(1142)
  .then((article) => {
    console.log('게시글 상세:', article);
  })
  .catch((error) => {
    console.error('게시글 조회 실패:', error);
  });

// 게시글 생성 테스트
const newArticle = {
  title: '테스트 게시글',
  content: '테스트 내용입니다.',
  image: 'https://example.com/image.jpg',
};

createArticle(newArticle.title, newArticle.content, newArticle.image)
  .then((result) => {
    console.log('게시글 생성 성공:', result);
  })
  .catch((error) => {
    console.error('게시글 생성 실패:', error);
  });

// 제품 목록 조회 테스트
getProductList(1, 10, '')
  .then((products) => {
    console.log('제품 목록:', products);
  })
  .catch((error) => {
    console.error('제품 목록 조회 실패:', error);
  });

// 단일 제품 조회 테스트
getProduct(1)
  .then((product) => {
    console.log('제품 상세:', product);
  })
  .catch((error) => {
    console.error('제품 조회 실패:', error);
  });

// 제품 생성 테스트
const newProduct = {
  name: '테스트 제품',
  description: '테스트 제품 설명',
  price: 10000,
  manufacturer: '제조사',
  tags: ['tag1', 'tag2'],
  images: ['image1.jpg', 'image2.jpg'],
};

createProduct(
  newProduct.name,
  newProduct.description,
  newProduct.price,
  newProduct.manufacturer,
  newProduct.tags,
  newProduct.images
)
  .then((result) => {
    console.log('제품 생성 성공:', result);
  })
  .catch((error) => {
    console.error('제품 생성 실패:', error);
  });
