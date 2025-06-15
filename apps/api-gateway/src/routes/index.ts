// src/routes/index.ts
import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import authRoutes from './auth.routes';
import inventoryRoutes from './inventory.routes';
import ordersRoutes from './orders.routes';
import notificationsRoutes from './notifications.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/inventory', authenticate, inventoryRoutes);
router.use('/orders', authenticate, ordersRoutes);
router.use('/notifications', authenticate, notificationsRoutes);

export default router;
