import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 20,
      minLength: 2,
    },
    description: {
      type: String,
    },
    price: { type: Number, required: true },
    tags: { type: Array, default: [] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
