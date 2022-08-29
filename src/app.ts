import { config } from "dotenv";
config();
import "express-async-errors";

import express from "express";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import connectDB from "./db";
// app
const app = express();
// port
const port = process.env.PORT || 3000;

// routes
app.get("/", (req, res) => {
  res.send("home");
});

// error middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
