import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import Product from "./src/models/Product.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
// const corsOptions = {
//   origin: ["http://127.0.0.1:5500", "https://my-todo.com"],
// };
// app.use(cors(corsOptions));
// 특정 주소에 대해서만 cors 허용. 이게 더 안전함
app.use(express.json());
// 앱 전체에서 express.json()을 사용하겠다는 의미
// req의 content-type이 application/json이면 이를 parsing해서 req body에 js객체로 담아줌)

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

// 비동기 오류 처리를 위한 함수(하지 않으면 오류 시 서버 자체가 죽어버림)
function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
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

// 상품 등록 API
app.post(
  "/products",
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  })
);

// 상품 상세 조회 API
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
      res.send(product);
    } else {
      res.status(404).send({ message: "해당 id의 상품을 찾을 수 없습니다." });
    }
  })
);

// 상품 목록 조회 API
app.get(
  "/products",
  asyncHandler(async (req, res) => {
    const products = await Product.find(
      {},
      { name: 1, price: 1, createdAt: 1 }
    );
    res.send(products);
  })
);

// 상품 수정 API
app.patch(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
      Object.keys(req.body).forEach((key) => {
        product[key] = req.body[key];
      });
      await product.save();
      res.status(201).send(product);
    } else {
      res.status(404).send({ message: "해당 id의 상품을 찾을 수 없습니다." });
    }
  })
);

// 상품 삭제 API
app.delete(
  "/products/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    // 삭제에 성공하면 product, 실패하면 null을 리턴
    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "해당 id의 상품을 찾을 수 없습니다." });
    }
  })
);

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
