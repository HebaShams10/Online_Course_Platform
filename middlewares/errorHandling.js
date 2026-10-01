const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  let statusCode = err.statusCode || 500;
  if (err.name === "CastError" || err.name === "ValidationError") {
    statusCode = 400;
  }
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;