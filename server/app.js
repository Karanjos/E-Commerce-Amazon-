import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
dotenv.config();
import "./db/conn.js";
import Products from "./models/productsSchema.js";
import productsdata from "./productsData.js";
import router from "./routes/router.js";
import cookieParser from "cookie-parser"; 

const app = express();

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = 8505;

const DefaultData = async () => {
  try {
    await Products.deleteMany({});
    const storeData = await Products.insertMany(productsdata);
    console.log(storeData);
  } catch (error) {
    console.log(error.message);
  }
};

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});

// DefaultData();
