import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import Product from "./src/models/Product.js";
import bodyParser from "body-parser";

dotenv.config();

export const app = express();
app.use(cors());
// const corsOptions = {
//   origin: ["http://127.0.0.1:5500", "https://my-todo.com"],
// };
// app.use(cors(corsOptions));
// 특정 주소에 대해서만 cors 허용. 이게 더 안전함
app.use(express.json());
// 앱 전체에서 express.json()을 사용하겠다는 의미
// req의 content-type이 application/json이면 이를 parsing해서 req body에 js객체로 담아줌)
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

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
    const newProduct = await Product.create(req.body);
    res.status(201).send(newProduct);
    // eslint-disable-next-line no-restricted-globals
    // location.replace("/");
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
    /**
     * 쿼리 파라미터
     * - sort: 최신(recent), 좋아요(favorite)
     * - offset: 건너뛸 개수
     * - keyword: 검색어
     * - limit: 갖고 올 데이터 개수
     */
    const sort = req.query.sort;
    const offset = req.query.offset;
    const search = req.query.keyword;
    const limit = req.query.limit;
    const count = limit || 0;

    // sort에 따라 최신순, 좋아요순 결정
    const sortOption =
      sort === "recent" ? { createdAt: "desc" } : { favoriteCount: "desc" };

    const products = await Product.find(
      search
        ? {
            $or: [
              { name: { $regex: `${search}`, $options: "i" } },
              { description: { $regex: `${search}`, $options: "i" } },
            ],
          }
        : {},
      { name: 1, price: 1, createdAt: 1, favoriteCount: 1 }
    )
      .sort(sortOption)
      .skip(offset)
      .limit(count);
    /**
     * collection의 전체 document 개수 받아오기
     * - pagination 구현에 필요
     * - searchCount가 있어 현 상황에서 toatalCount는 없어도 될 것으로 보이나 일단 살려둠(2024.11.28)
     */
    // const totalCount = await Product.count();
    // offset, limit이 반영되지 않은 전체 검색 결과 개수
    const searchCount = await Product.count(
      search
        ? {
            $or: [
              { name: { $regex: `${search}`, $options: "i" } },
              { description: { $regex: `${search}`, $options: "i" } },
            ],
          }
        : {}
    );
    const finalData = {
      // totalCount: totalCount,
      searchCount: searchCount,
      products: products,
    };
    res.send(finalData);
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

app.listen(process.env.PORT || 5500, () => console.log("Server Started"));