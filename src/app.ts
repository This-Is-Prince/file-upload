import { config } from "dotenv";
config();
import "express-async-errors";
import path from "path";
import fileUpload from "express-fileupload";
// USE V2
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
});

import express from "express";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import connectDB from "./db";
import productRouter from "./routes/product.route";
// app
const app = express();
// port
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.static(path.resolve(__dirname, "./public")));

// routes
app.use("/api/v1/products", productRouter);

// error middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
