import express from "express";
import cors from "cors";
import "express-async-errors";
import mongoose from "mongoose";

import { initializeBucket } from "./utils/files.js";
import config from "./utils/config.js";

import seriesRouter from "./controllers/series.js";
import usersRouter from "./controllers/users.js";
import imagesRouter from "./controllers/images.js";

const app = express();

mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

initializeBucket().then(() => console.log("Configured Minio"));

app.use(express.json());
app.use(cors());

app.use("/api", seriesRouter);
app.use("/api/users", usersRouter);
app.use("/api/images", imagesRouter);

export default app;
