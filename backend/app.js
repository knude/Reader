import express from "express";
import cors from "cors";
import "express-async-errors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import config from "./utils/config.js";
import { initializeBucket } from "./utils/files.js";
import imageRouter from "./controllers/image.js";
import loginRouter from "./controllers/login.js";
import seriesRouter from "./controllers/series.js";
import userRouter from "./controllers/user.js";
import User from "./models/User.js";

const app = express();

const establishConnections = async () => {
  try {
    await mongoose.connect(config.mongoUrl);
    console.log("connected to MongoDB");

    if (config.adminUserName && config.adminUserPassword) {
      if (await User.exists({ username: config.adminUserName })) {
        console.log("Admin user already exists");
        return;
      }

      const passwordHash = await bcrypt.hash(config.adminUserPassword, 10);
      const adminUser = new User({
        username: config.adminUserName,
        passwordHash: passwordHash,
        admin: true,
      });
      await adminUser.save();
      console.log("Admin user created");
    }
  } catch (error) {
    console.error("error connecting to MongoDB:", error.message);
  }
  try {
    await initializeBucket();
  } catch (error) {
    console.error(`Error initializing bucket: ${error}`);
  }
  console.log("Connected to Minio");
};

establishConnections();

app.use(express.json());
app.use(cors());

app.use("/api/series", seriesRouter);
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/images", imageRouter);

export default app;
