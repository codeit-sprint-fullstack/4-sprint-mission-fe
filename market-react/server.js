import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import Product from "./src/models/Product.js";  // Product 모델을 import
import bodyParser from "body-parser";

dotenv.config();

export const app = express();

// CORS 설정: 특정 origin만 허용하도록 수정 (필요한 origin을 추가)
const corsOptions = {
  origin: ["http://localhost:5500", "https://example.com"], // 클라이언트 URL을 여기에 추가
};
app.use(cors(corsOptions));

app.use(express.json());  // JSON 형태로 body를 처리하도록 설정
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB 연결
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("DB connection error:", err));

// 비동기 오류 처리를 위한 함수
function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      console.error("Error occurred:", e);  // 에러 로그 추가
      if (e.name === "ValidationError") {
        res.status(400).send({ message: e.message });
      } else if (e.name === "CastError") {
        res.status(404).send({ message: "해당 id의 상품을 찾을 수 없습니다." });
      } else {
        res.status(500).send({ message: e.message });
      }
    }
  };
}

// 상품 등록 API (POST)
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const newProduct = await Product.create(req.body);  // 상품을 생성
    res.status(201).send(newProduct);  // 생성된 상품을 응답
  })
);

// 상품 상세 조회 API (GET)
app.get(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id, {
      name: 1,
      price: 1,
      createdAt: 1,
      tags: 1,
      description: 1,
    });

    if (product) {
      res.send(product);  // 상품 정보 응답
    } else {
      res.status(404).send({ message: "해당 id의 상품을 찾을 수 없습니다." });
    }
  })
);

// 상품 목록 조회 API (GET)
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const { sort, offset = 0, keyword = "", limit = 0 } = req.query;  // 쿼리 파라미터 처리
    const count = limit ? parseInt(limit) : 10; // 기본 limit을 10으로 설정

    const sortOption = sort === "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" };

    // 검색어가 있을 경우 조건 추가
    const searchCondition = keyword
      ? {
          $or: [
            { name: { $regex: `${keyword}`, $options: "i" } },
            { description: { $regex: `${keyword}`, $options: "i" } },
          ],
        }
      : {};

    const products = await Product.find(searchCondition, {
      name: 1,
      price: 1,
      createdAt: 1,
      favoriteCount: 1,
    })
      .sort(sortOption)  // 정렬
      .skip(parseInt(offset))  // 건너뛸 개수
      .limit(count);  // 결과 개수 제한

    const searchCount = await Product.countDocuments(searchCondition);

    const finalData = {
      searchCount: searchCount,
      products: products,
    };

    res.send(finalData);  // 결과 응답
  })
);

app.get('/products', asyncHandler(async (req, res) => {
  console.log("GET /products 요청 수신");  // 로그 출력

  const { sort = "recent", offset = 0, keyword = "", limit = 0 } = req.query;
  const count = limit ? parseInt(limit) : 10;

  const sortOption = sort === "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" };

  const searchCondition = keyword
    ? {
        $or: [
          { name: { $regex: `${keyword}`, $options: "i" } },
          { description: { $regex: `${keyword}`, $options: "i" } },
        ],
      }
    : {};

  try {
    const products = await Product.find(searchCondition)
      .sort(sortOption)
      .skip(parseInt(offset))
      .limit(count);
  
    const searchCount = await Product.countDocuments(searchCondition);

    const finalData = {
      searchCount: searchCount,
      products: products,
    };
    res.send(finalData);
  } catch (error) {
    console.error("오류 발생:", error);  // 오류 출력
    res.status(500).send({ message: error.message });
  }
}));

// 상품 수정 API (PATCH)
app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      // 요청된 데이터를 사용하여 상품 정보 업데이트
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });
      await product.save();  // 수정된 상품 저장
      res.status(200).send(product);  // 수정된 상품 응답
    } else {
      res.status(404).send({ message: "해당 id의 상품을 찾을 수 없습니다." });
    }
  })
);

// 서버 시작
app.listen(process.env.PORT || 5500, () =>
  console.log("Server Started on port 5500")
);
