import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const INVENTORY_SERVICE_URL = process.env.INVENTORY_SERVICE_URL || 'http://localhost:4001'; // Assuming Inventory Service runs on 4001

export const forwardToInventory = async (method: 'get' | 'post' | 'put' | 'delete', req: any, res: any, next: any) => {
  try {
    // Use req.path which is the path relative to the router's mount point (/products or /vendors or /inventory)
    const url = `${INVENTORY_SERVICE_URL}/api${req.path}`;
    const headers = {
      'X-User-Id': req.user?.userId, // Assuming authenticate middleware adds req.user
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