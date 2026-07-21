import type { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err); // 👈 Add this
  let statusCode = 500;
  let message = "Internal Server Error";

  // PostgreSQL Duplicate Key Error
  if (err.code === "23505") {
    statusCode = 409;
    message = "Email already exists";
  }

  // Custom Error
  if (err.statusCode) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default globalErrorHandler;
