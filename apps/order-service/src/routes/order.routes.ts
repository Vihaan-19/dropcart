import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { getOrders, createOrder, getOrderById, updateOrderStatus, cancelOrder } from '../controllers/order.controller';

const router = Router();

router.use(authenticateJWT);

router.get('/', ...getOrders);
router.post('/', ...createOrder);
router.get('/:orderId', getOrderById);
router.put('/:orderId', ...updateOrderStatus);
router.delete('/:orderId', cancelOrder);

export default router; 