import { Request, Response, NextFunction } from "express";
import { errorLog } from "../utils";

// info: express 错误中间件的四个参数都不能少
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  errorLog(err);
  return res.status(statusCode).send({
    code: statusCode,
    msg: message,
    data: null,
  });
};
