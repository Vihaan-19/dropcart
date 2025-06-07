import { Router } from 'express';
import { forwardToOrderService } from '../services/orders.service';

const ordersRoutes = Router();

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