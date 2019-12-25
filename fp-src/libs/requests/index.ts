import * as R from "ramda";
import { Response, Request, NextFunction } from "express";

export const returnJsonResponse = R.curry(
  async (
    status: number,
    fn: (req: Request) => Promise<any> | any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(status).json(await fn(req));
    } catch (e) {
      return next(e);
    }
  }
);

export const return200JsonResponse = returnJsonResponse(200);
export const return201JsonResponse = returnJsonResponse(201);
export const return202JsonResponse = returnJsonResponse(202);
export const return404JsonResponse = returnJsonResponse(404);
export const return500JsonResponse = returnJsonResponse(500);
