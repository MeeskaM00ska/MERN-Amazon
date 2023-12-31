import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/productRoutes.js";
const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.get("/", (req, res) => {
  return res.send("this is the first page");
});

app.use("/api/products", productRoutes);

//under all routes
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
