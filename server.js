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

// 상품 등록
app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).send(product);
});

app.listen(process.env.PORT || 3000, () => console.log("Server Started"));
