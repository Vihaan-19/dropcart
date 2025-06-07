import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:4006'; // Assuming Notification Service runs on 4006

export const forwardToNotificationService = async (method: 'get' | 'put', req: any, res: any, next: any) => {
  try {
    // Use req.path which is the path relative to the router's mount point (/notifications)
    const url = `${NOTIFICATION_SERVICE_URL}/api${req.path}`;
    const headers = {
      'X-User-Id': req.user?.userId, // Assuming authenticate middleware adds req.user
      'X-User-Role': req.user?.role,
      'Content-Type': req.headers['content-type'], // Forward if needed
    };

    const config: any = { method, url, headers };

    if (method === 'put') {
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