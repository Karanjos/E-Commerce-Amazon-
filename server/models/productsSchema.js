import mongoose from "mongoose";

const productsSchema = mongoose.Schema({
  id: String,
  url: String,
  detailUrl: String,
  title: Object,
  price: Object,
  description: String,
  discount: String,
  tagline: String,
});

const Products = new mongoose.model("products", productsSchema);

export default Products;
