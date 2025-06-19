import { Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as paymentService from '../services/payment.service';
import { ApiResponse, AuthenticatedRequest } from '../types/express.d';
import { processPaymentSchema, refundPaymentSchema } from '../validators/payment.validator';
import { validateBody } from '../middlewares/validation.middleware';
import { ROLES } from '../config/constants';

export const processPayment = [
  validateBody(processPaymentSchema),
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { orderId, method, amount } = req.validatedBody;
    const payment = await paymentService.processPayment(orderId, method, amount);
    res.status(201).json({ success: true, data: payment } as ApiResponse);
  })
];

export const getPaymentById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { user } = req;
  const { paymentId } = req.params;
  const payment = await paymentService.getPaymentById(paymentId, user!.userId, user!.role);
  res.json({ success: true, data: payment } as ApiResponse);
});

export const refundPayment = [
  validateBody(refundPaymentSchema),
  asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const { user } = req;
    const { paymentId } = req.params;
    if (![ROLES.ADMIN, ROLES.VENDOR].includes(user!.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const payment = await paymentService.refundPayment(paymentId, user!.userId, user!.role);
    res.json({ success: true, data: payment } as ApiResponse);
  })
]; 