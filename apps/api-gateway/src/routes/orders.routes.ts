import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const ordersRoutes = Router();

const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

// Helper to forward requests to the consolidated Order/Payment service
const forwardToOrderService = async (method: 'get' | 'post' | 'put' | 'delete', req: any, res: any, next: any) => {
  try {
    // Forward the request path as is after the base /orders path is handled by the gateway
    const url = `${ORDER_SERVICE_URL}${req.originalUrl}`;
    const headers = {
      // Removed Authorization header as token is verified in API Gateway
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
    // Improved error handling to propagate downstream service errors
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    next(error); // Pass other errors to the global error handler
  }
};

// Define routes for Orders and Payments service as per OpenAPI spec (consolidated for MVP)

// --- Order Management ---

// GET /orders - Get user orders
ordersRoutes.get('/', (req, res, next) => forwardToOrderService('get', req, res, next));

// POST /orders - Create a new order
ordersRoutes.post('/', (req, res, next) => forwardToOrderService('post', req, res, next));

// GET /orders/{orderId} - Get order by ID
ordersRoutes.get('/:orderId', (req, res, next) => forwardToOrderService('get', req, res, next));

// PUT /orders/{orderId} - Update order status
ordersRoutes.put('/:orderId', (req, res, next) => forwardToOrderService('put', req, res, next));

// DELETE /orders/{orderId} - Cancel order
ordersRoutes.delete('/:orderId', (req, res, next) => forwardToOrderService('delete', req, res, next));

// --- Payment Management (Consolidated) ---

// POST /payments/process - Process payment for order
ordersRoutes.post('/payments/process', (req, res, next) => forwardToOrderService('post', req, res, next));

// GET /payments/{paymentId} - Get payment details
ordersRoutes.get('/payments/:paymentId', (req, res, next) => forwardToOrderService('get', req, res, next));

// POST /payments/refund/{paymentId} - Process refund
ordersRoutes.post('/payments/refund/:paymentId', (req, res, next) => forwardToOrderService('post', req, res, next));

export default ordersRoutes; 