import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as orderService from '../services/order.service';
import { ApiResponse, AuthenticatedRequest } from '../types/express.d';
import { createOrderSchema, updateOrderStatusSchema, orderQuerySchema } from '../validators/order.validator';
import { validateBody, validateQuery } from '../middlewares/validation.middleware';
import { ROLES } from '../config/constants';

export const getOrders = [
  validateQuery(orderQuerySchema),
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { page = '1', limit = '10', status } = req.query as any;
    const { user } = req;
    const result = await orderService.getOrders(
      user!.userId,
      user!.role,
      parseInt(page, 10),
      parseInt(limit, 10),
      status as any
    );
    res.json({ success: true, data: result } as ApiResponse);
  })
];

export const createOrder = [
  validateBody(createOrderSchema),
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { user } = req;
    const { items, shippingAddress } = req.validatedBody;
    const order = await orderService.createOrder(user!.userId, items, shippingAddress);
    res.status(201).json({ success: true, data: order } as ApiResponse);
  })
];

export const getOrderById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const { orderId } = req.params;
  const order = await orderService.getOrderById(orderId, user!.userId, user!.role);
  res.json({ success: true, data: order } as ApiResponse);
});

export const updateOrderStatus = [
  validateBody(updateOrderStatusSchema),
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { user } = req;
    const { orderId } = req.params;
    const { status } = req.validatedBody;
    if (![ROLES.ADMIN, ROLES.VENDOR].includes(user!.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const order = await orderService.updateOrderStatus(orderId, status, user!.userId, user!.role);
    res.json({ success: true, data: order } as ApiResponse);
  })
];

export const cancelOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const { orderId } = req.params;
  const order = await orderService.cancelOrder(orderId, user!.userId, user!.role);
  res.json({ success: true, data: order } as ApiResponse);
}); 