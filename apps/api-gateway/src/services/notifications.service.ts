import dotenv from 'dotenv';
import { forwardRequest } from './proxy.service';
import { Request, Response, NextFunction } from 'express';
import { HTTPMethod } from './proxy.service';

dotenv.config();

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:4004';

export const forwardToNotificationService = (
  method: HTTPMethod,
  req: Request,
  res: Response,
  next: NextFunction
) => forwardRequest({ method, baseUrl: NOTIFICATION_SERVICE_URL, req, res, next });
