import express from "express";
import cors from "cors";

import { errorHandlerMiddleware } from "./utils/errorHandlerMiddleware.js";
import { initializeBucket } from "./utils/files.js";

import { imageController } from "./controllers/imageController.js";

const app = express();

initializeBucket().then(() => console.log("Configured Minio"));

app.use(express.json());
app.use(cors());

app.use("/api/images", imageController);

app.use(errorHandlerMiddleware);

export default app;
