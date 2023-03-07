export default (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err);
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
};
