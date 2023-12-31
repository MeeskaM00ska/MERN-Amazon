import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import userModel from "./models/userModel.js";
import productModel from "./models/productModel.js";
import orderModel from "./models/orderModel.js";
import connectDB from "./config/db.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";

dotenv.config();
await connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUser = await User.insertMany(users);

    const adminUser = createUser[0]._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destoryData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data deleted!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destoryData();
} else {
  importData();
}
