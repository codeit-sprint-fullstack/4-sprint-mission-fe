import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 10,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
    },
    price: { type: Number, required: true },
    tags: { type: [{ type: String, maxLength: 5 }] },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
