import dotenv from 'dotenv';
import { forwardRequest } from './proxy.service';
import { Request, Response, NextFunction } from 'express';
import { HTTPMethod } from './proxy.service';

dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:4000';

export const forwardToAuthService = (
  method: HTTPMethod,
  req: Request,
  res: Response,
  next: NextFunction
) => forwardRequest({ method, baseUrl: AUTH_SERVICE_URL, req, res, next });
