import { PrismaClient } from '@prisma/client';
import { AppError } from '../utils/error';
import { ORDER_ERRORS, ROLES } from '../config/constants';
import { OrderStatus } from '../types/order.types';

const prisma = new PrismaClient();

export const getOrders = async (userId: string, role: string, page = 1, limit = 10, status?: OrderStatus) => {
  const where: any = {};
  if (role === ROLES.CUSTOMER) {
    where.userId = userId;
  }
  if (status) {
    where.status = status;
  }
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { items: true, payment: true },
    }),
    prisma.order.count({ where }),
  ]);
  return { orders, total, page, limit };
};

export const createOrder = async (userId: string, items: { productId: string; quantity: number }[], shippingAddress: any) => {
  // TODO: Replace this with a real cross-service call to inventory-service for product prices
  // For now, simulate all products as price 10.0
  let totalAmount = 0;
  const orderItems = items.map(item => {
    const price = 10.0; // Placeholder
    totalAmount += price * item.quantity;
    return {
      productId: item.productId,
      quantity: item.quantity,
      price,
    };
  });
  const order = await prisma.order.create({
    data: {
      userId,
      status: 'PENDING',
      totalAmount,
      shippingAddress,
      items: { create: orderItems },
    },
    include: { items: true },
  });
  return order;
};

export const getOrderById = async (orderId: string, userId: string, role: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true, payment: true },
  });
  if (!order) throw new AppError(ORDER_ERRORS.NOT_FOUND, 404);
  if (role === ROLES.CUSTOMER && order.userId !== userId) {
    throw new AppError(ORDER_ERRORS.UNAUTHORIZED, 403);
  }
  return order;
};

export const updateOrderStatus = async (orderId: string, status: OrderStatus, userId: string, role: string) => {
  if (![ROLES.ADMIN, ROLES.VENDOR].includes(role)) {
    throw new AppError(ORDER_ERRORS.UNAUTHORIZED, 403);
  }
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: { items: true, payment: true },
  });
  return order;
};

export const cancelOrder = async (orderId: string, userId: string, role: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new AppError(ORDER_ERRORS.NOT_FOUND, 404);
  if (role !== ROLES.CUSTOMER || order.userId !== userId) {
    throw new AppError(ORDER_ERRORS.UNAUTHORIZED, 403);
  }
  if (order.status !== 'PENDING') {
    throw new AppError(ORDER_ERRORS.CANNOT_CANCEL, 400);
  }
  const updated = await prisma.order.update({
    where: { id: orderId },
    data: { status: 'CANCELLED' },
    include: { items: true, payment: true },
  });
  return updated;
}; 