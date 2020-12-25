import { Router } from 'express';
import * as productController from '../controllers/productController';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/product')
	.post(productController.addProduct)
	.get(productController.getAllProducts)
	.all(generate405);
router.route('/product/:ean')
	.get(productController.getProduct)
	.put(productController.updateProduct)
	.delete(productController.deleteProduct)
	.all(generate405);

export const productRoutes = router;
