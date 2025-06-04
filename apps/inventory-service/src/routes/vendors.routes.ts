import { Router } from 'express';
import { getAllVendors, createVendor, getVendorById, getMyStore, updateMyStore } from '../controllers/vendors.controller';
import { getAllVendorsValidation, createVendorValidation, getVendorByIdValidation, updateMyStoreValidation, handleValidationErrors } from '../middlewares/validation.middleware';

const router = Router();

router.get('/', getAllVendorsValidation, handleValidationErrors, getAllVendors);
router.post('/', createVendorValidation, handleValidationErrors, createVendor);

router.get('/:vendorId', getVendorByIdValidation, handleValidationErrors, getVendorById);

router.get('/my-store', getMyStore);
router.put('/my-store', updateMyStoreValidation, handleValidationErrors, updateMyStore);

export default router; 