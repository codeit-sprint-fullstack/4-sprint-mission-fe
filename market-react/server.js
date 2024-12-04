import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import Product from "./src/models/Product.js";
import bodyParser from "body-parser";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to DB"));

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

    if (product) {
      res.sendStatus(204);
    } else {
      res.status(404).send({ message: "해당 id의 상품을 찾을 수 없습니다." });
    }
  })
);

app.listen(process.env.PORT || 5500, () => console.log("Server Started"));