import bcrypt from "bcrypt";
import User from "../models/User.js";
import { Router } from "express";
import errorHandlerMiddleware from "../utils/errorHandlerMiddleware.js";

const router = Router();

router.post("/", async (request, response) => {
  const { username, password } = request.body;

  if (!username) {
    response.status(400).json({ error: "Username is required." });
    return;
  }
  if (!password) {
    response.status(400).json({ error: "Password is required." });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

router.get("/:userId", async (request, response) => {
  const { userId } = request.params;

  const userObj = await User.findOne({ _id: userId });

  if (!userObj) {
    response.status(404).json({ error: "User not found." });
    return;
  }
  response.status(200).json(userObj);
});

router.use(errorHandlerMiddleware);

export default router;
