import { Request, Response, NextFunction } from 'express';

type AsyncFunction<T extends Request = Request> = (
  req: T,
  res: Response,
  next: NextFunction
) => Promise<any> | any;

export const asyncHandler = <T extends Request = Request>(fn: AsyncFunction<T>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req as T, res, next)).catch(next);
}; 