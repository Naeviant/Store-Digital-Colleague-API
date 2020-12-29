import { Router } from 'express';
import * as productController from '../controllers/productController';
import { isAdmin } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/product')
	.post(isAdmin, productController.addProduct)
	.get(productController.getAllProducts)
	.all(generate405);
router.route('/product/:ean')
	.get(productController.getProduct)
	.patch(isAdmin, productController.updateProduct)
	.delete(isAdmin, productController.deleteProduct)
	.all(generate405);

export const productRoutes = router;