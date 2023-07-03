import jwt from "jsonwebtoken";
import config from "./config.js";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const authToken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(authToken, config.tokenSecret);
    req.userId = decodedToken.id;

    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ error: "Token expired." });
    }

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ error: "Invalid token." });
  }
};

export default authMiddleware;
