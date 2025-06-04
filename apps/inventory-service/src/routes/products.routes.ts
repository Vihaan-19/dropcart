import { Router } from 'express';
import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller';
import { getAllProductsValidation, createProductValidation, getProductByIdValidation, updateProductValidation, deleteProductValidation, handleValidationErrors } from '../middlewares/validation.middleware';

const router = Router();

router.get('/', getAllProductsValidation, handleValidationErrors, getAllProducts);
router.post('/', createProductValidation, handleValidationErrors, createProduct);

router.get('/:productId', getProductByIdValidation, handleValidationErrors, getProductById);
router.put('/:productId', updateProductValidation, handleValidationErrors, updateProduct);
router.delete('/:productId', deleteProductValidation, handleValidationErrors, deleteProduct);

export default router;