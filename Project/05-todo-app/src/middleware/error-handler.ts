import express from "express";
import { ApiError, ValidationError } from "../utils/error";

export const errorHandler: unknown = (
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      ...(err instanceof ValidationError && err.details
        ? { details: err.details }
        : {}),
    });
  }
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "something went wrong.",
  });
};
