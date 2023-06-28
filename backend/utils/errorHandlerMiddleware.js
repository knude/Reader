export default (error, request, response, next) => {
  console.error("ERROR::", error.message);
  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return response.status(400).json({ error: error.message });
    case "FileNotFoundError":
      return response.status(404).json({ error: error.message });
    case "JsonWebTokenError":
      return response.status(401).json({ error: "token invalid" });
    case "TokenExpiredError":
      return response.status(401).json({ error: "token expired" });
    default:
      break;
  }
  next(error);
};
