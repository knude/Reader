import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router } from "express";
import errorHandlerMiddleware from "../utils/errorHandlerMiddleware.js";

import User from "../models/User.js";

const router = Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    res.status(401).json({
      error: "Invalid username or password.",
    });
    return;
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({ token, username: user.username, id: user._id });
});

router.use(errorHandlerMiddleware);

export default router;
