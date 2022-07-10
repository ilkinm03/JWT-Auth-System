import { ErrorRequestHandler } from "express";
import logger from "../logger/logger";
import ApiError from "../exception/api.error";

const errorMiddleware: ErrorRequestHandler = async (err, req, res, _next) => {
  logger.warn(
    err
      ? `${err.name}: ${err.message} - ${JSON.stringify(err.error)} - ${
          err.reason ? err.reason : req.method
        }`
      : "Error"
  );
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .send({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Something went wrong!" });
};

export default errorMiddleware;
