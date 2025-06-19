import { Router } from 'express';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { processPayment, getPaymentById, refundPayment } from '../controllers/payment.controller';

const router = Router();

router.use(authenticateJWT);

router.post('/process', ...processPayment);
router.get('/:paymentId', getPaymentById);
router.post('/refund/:paymentId', ...refundPayment);

export default router; 