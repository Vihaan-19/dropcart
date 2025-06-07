import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:4003'; // Assuming Order Service runs on 4003

export const forwardToOrderService = async (method: 'get' | 'post' | 'put' | 'delete', req: any, res: any, next: any) => {
  try {
    const url = `${ORDER_SERVICE_URL}/api${req.originalUrl.replace('/orders', '')}`;
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