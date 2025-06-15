import dotenv from 'dotenv';
import { forwardRequest } from './proxy.service';
import { Request, Response, NextFunction } from 'express';
import { HTTPMethod } from './proxy.service';

dotenv.config();

const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:4001';

export const forwardToInventory = (
  method: HTTPMethod,
  req: Request,
  res: Response,
  next: NextFunction
) => forwardRequest({ method, baseUrl: INVENTORY_SERVICE_URL, req, res, next });
