import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
