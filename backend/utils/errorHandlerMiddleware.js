export default (error, request, response, next) => {
  switch (error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return response.status(400).json({ error: error.message });
    case "FileNotFoundError":
      return response.status(404).json({ error: error.message });
    default:
      break;
  }
  next(error);
};
