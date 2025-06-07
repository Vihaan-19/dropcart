import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:4000';

export const forwardToAuthService = async (method: 'get' | 'post' | 'put', req: any, res: any, next: any) => {
  try {
    const url = `${AUTH_SERVICE_URL}/api${req.path}`;
    const headers = {
      'X-User-Id': req.user?.userId,
      'X-User-Role': req.user?.role,
      'Content-Type': req.headers['content-type'],
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