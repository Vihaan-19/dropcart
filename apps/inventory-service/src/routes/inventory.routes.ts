import { Router } from 'express';
import { getInventoryDetails, updateProductStock, getInventoryLogs } from '../controllers/inventory.controller';
import { getInventoryDetailsValidation, updateProductStockValidation, getInventoryLogsValidation, handleValidationErrors } from '../middlewares/validation.middleware';

const router = Router();

router.get('/:productId', getInventoryDetailsValidation, handleValidationErrors, getInventoryDetails);
router.put('/:productId', updateProductStockValidation, handleValidationErrors, updateProductStock);

router.get('/:productId/logs', getInventoryLogsValidation, handleValidationErrors, getInventoryLogs);

export default router; 