import dotenv from 'dotenv';
import { forwardRequest } from './proxy.service';
import { Request, Response, NextFunction } from 'express';
import { HTTPMethod } from './proxy.service';

dotenv.config();

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:4003';

export const forwardToOrderService = (
  method: HTTPMethod,
  req: Request,
  res: Response,
  next: NextFunction
) =>
  forwardRequest({
    method,
    baseUrl: ORDER_SERVICE_URL,
    req,
    res,
    next,
    rewritePathPrefix: '/orders',
  });
