import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { initializeBucket } from "./utils/files.js";
import config from "./utils/config.js";

import imageController from "./controllers/imageController.js";

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

app.use("/api/images", imageController);

export default app;
