// src/services/proxy.service.ts
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

interface ProxyOptions {
  method: HTTPMethod;
  baseUrl: string;
  req: Request;
  res: Response;
  next: NextFunction;
  rewritePathPrefix?: string; 
}

export const forwardRequest = async ({
  method,
  baseUrl,
  req,
  res,
  next,
  rewritePathPrefix = '',
}: ProxyOptions) => {
  try {
    let path = req.path;
    if (rewritePathPrefix && req.originalUrl.startsWith(rewritePathPrefix)) {
      path = req.originalUrl.replace(rewritePathPrefix, '');
    }

    const url = `${baseUrl}/api${path}`;
    const headers = {
      'X-User-Id': req.user?.userId,
      'X-User-Role': req.user?.role,
      'Content-Type': req.headers['content-type'] || 'application/json',
    };

    const config: any = { method, url, headers };

    if (method === 'post' || method === 'put') {
      config.data = req.body;
    } else if (method === 'get') {
      config.params = req.query;
    }

    const response = await axios(config);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    next(error);
  }
};
