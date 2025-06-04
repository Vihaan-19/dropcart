import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const notificationsRoutes = Router();

const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3006';

// Helper to forward requests to the Notification service
const forwardToNotificationService = async (method: 'get' | 'put', req: any, res: any, next: any) => {
  try {
    // Use req.path which is the path relative to the router's mount point (/notifications)
    const url = `${NOTIFICATION_SERVICE_URL}${req.path}`;
    const headers = {
      // Removed Authorization header as token is verified in API Gateway
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
    // Improved error handling to propagate downstream service errors
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    next(error); // Pass other errors to the global error handler
  }
};

// Define routes for Notification service as per OpenAPI spec
// These paths are relative to the router's mount point (/notifications)

// GET /notifications
notificationsRoutes.get('/', (req, res, next) => forwardToNotificationService('get', req, res, next));

// PUT /notifications/{notificationId}/read
notificationsRoutes.put('/:notificationId/read', (req, res, next) => forwardToNotificationService('put', req, res, next));

export default notificationsRoutes; 