import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 1,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
    },
    price: { type: Number, required: true },
    tags: { type: [{ type: String, maxLength: 5 }] },
    favoriteCount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;