import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/error';
import { PAYMENT_ERRORS } from '../config/constants';
import { PaymentStatus, PaymentMethod } from '../types/payment.types';

const prisma = new PrismaClient();

export const processPayment = async (orderId: string, method: PaymentMethod, amount: number) => {
  // Check if order exists and is unpaid
  const order = await prisma.order.findUnique({ where: { id: orderId }, include: { payment: true } });
  if (!order) throw new AppError('Order not found', 404);
  if (order.payment) throw new AppError('Order already paid', 400);
  if (order.totalAmount !== amount) throw new AppError('Amount mismatch', 400);
  // Simulate payment processing
  const payment = await prisma.payment.create({
    data: {
      orderId,
      status: 'COMPLETED',
      amount,
      method,
      transactionId: `txn_${Date.now()}`,
    },
  });
  await prisma.order.update({ where: { id: orderId }, data: { status: 'COMPLETED' } });
  return payment;
};

export const getPaymentById = async (paymentId: string, userId: string, role: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: { order: true },
  });
  if (!payment) throw new AppError(PAYMENT_ERRORS.NOT_FOUND, 404);
  if (role === 'CUSTOMER' && payment.order.userId !== userId) {
    throw new AppError(PAYMENT_ERRORS.UNAUTHORIZED, 403);
  }
  return payment;
};

export const refundPayment = async (paymentId: string, userId: string, role: string) => {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId }, include: { order: true } });
  if (!payment) throw new AppError(PAYMENT_ERRORS.NOT_FOUND, 404);
  if (role !== 'ADMIN' && role !== 'VENDOR') {
    throw new AppError(PAYMENT_ERRORS.UNAUTHORIZED, 403);
  }
  if (payment.status !== 'COMPLETED') {
    throw new AppError('Only completed payments can be refunded', 400);
  }
  const refunded = await prisma.payment.update({
    where: { id: paymentId },
    data: { status: 'REFUNDED' },
  });
  await prisma.order.update({ where: { id: payment.orderId }, data: { status: 'CANCELLED' } });
  return refunded;
}; 