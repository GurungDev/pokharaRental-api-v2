import { Response } from "express";

export class ResponseHandler {
  static success<T>(
    res: Response,
    message: string,
    data?: T,
    statusCode = 200
  ): Response<T> {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static fail<T>() {
    // TODO: not to be implemented
  }
}
