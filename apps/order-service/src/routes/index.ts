import { Express } from 'express';
import orderRoutes from './order.routes';
import paymentRoutes from './payment.routes';

export function registerRoutes(app: Express) {
  app.use('/orders', orderRoutes);
  app.use('/payments', paymentRoutes);
} 