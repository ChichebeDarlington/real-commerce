import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import productRouter from "./routes/productRoute.js";
import formidableMiddleware from "express-formidable";
import cors from "cors";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((error) => console.log(error));

//   middlewares
app.use(cors());
// app.use(formidableMiddleware());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
// routes
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
