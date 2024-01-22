import { NextFunction, Request, Response } from "express";
import { ExpressError } from "../class/error";
import multer from "multer";
import { EnvConfig } from "../../config/envConfig";
import { TokenExpiredError } from "jsonwebtoken";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
    console.log("from error middleware :- ", err);

  let error: ExpressError;
  if (err instanceof ExpressError) {
    error = err;
  } else if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      error = new ExpressError(400, `${err.field} size is too large.`);
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      error = new ExpressError(
        400,
        `File upload not allowed for ${err.field}.`
      );
    } else {
      error = new ExpressError(
        400,
        `${err.code}: File upload error. Please try again.`
      );
    }
  } else if (err instanceof TokenExpiredError) {
    error = new ExpressError(401, "Token expired. Please login again.");
  } else {
    error = new ExpressError(500, err.message);
  }

  try {
    if (req.body?.assets) {
    }
  } catch (e) {
    console.log("error while uploading file", e);
  }

  return res.status(error.getStatus).json({
    success: false,
    message: error.message,
    ...error.getProps,
  });
}
