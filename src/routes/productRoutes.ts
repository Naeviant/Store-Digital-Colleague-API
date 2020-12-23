import { Router } from 'express';
import * as productController from '../controllers/productController';

const router = Router();

router.post('/product', productController.addProduct);
router.get('/product', productController.getAllProducts);
router.get('/product/:ean', productController.getProduct);
router.put('/product/:ean', productController.updateProduct);
router.delete('/product/:ean', productController.deleteProduct);

export const productRoutes = router;
