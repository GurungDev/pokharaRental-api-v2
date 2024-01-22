import { plainToClassFromExist } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, RequestHandler, Response } from "express";
 import { ExpressError } from "./error";
import { RequestDataPaths } from "../enum/enums";

export class Validator {
  private static getDataPoint(req: Request, path: RequestDataPaths) {
    switch (path) {
      case RequestDataPaths.Body:
        return req.body;

      case RequestDataPaths.Params:
        return req.params;

      case RequestDataPaths.Query:
        return req.query;

      // case RequestDataPaths.Files:
      //   return req.files;

      default:
        break;
    }
  }

  private static getData(
    req: Request,
    path: RequestDataPaths,
    prop: string | undefined
  ) {
    let dataPoint = Validator.getDataPoint(req, path);

    return prop ? dataPoint[prop] : dataPoint;
  }

  private static setData(
    req: Request,
    data: any,
    path: RequestDataPaths,
    prop: string | undefined
  ) {
    let dataPoint = Validator.getDataPoint(req, path);

    prop ? (dataPoint[prop] = data) : (dataPoint = data);
  }

  public static validate<T extends object>(
    cls: new () => T,
    path: RequestDataPaths,
    prop?: string
  ): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        let data = plainToClassFromExist(
          new cls(),
          Validator.getData(req, path, prop)
        );

        data = data ?? {};

        if (!data) {
          throw new ExpressError(
            400,
            `Cannot validate data. Please try again later.`
          );
        }
        const errors = await validate(data);

        if (errors.length > 0) {
          const validationErrors: Record<string, string[]> = {};
          errors.forEach((error) => {
            const { property, constraints } = error;
            validationErrors[property] = Object.values(constraints || {});
          });

          let firstError: string | undefined;
          if (validationErrors && Object.values(validationErrors).length > 0) {
            firstError = Object.values(validationErrors)[0][0];
          }

          return next(
            new ExpressError(
              400,
              `${
                firstError
                  ? `${firstError}`
                  : "Validation failed. Please re-submit."
              }.`,
              {
                validationErrors,
              }
            )
          );
        }
        Validator.setData(req, data, path, prop);
        next();
      } catch (err) {
        next(err);
      }
    };
  }
}
