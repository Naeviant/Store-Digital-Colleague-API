import { Router } from 'express';
import * as productQuantityController from '../controllers/productQuantityController';
import { isUser } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/product/quantity/:code/:ean')
	.get(productQuantityController.getQuantity)
	.patch(isUser, productQuantityController.setQuantity)
	.all(generate405);

export const productQuantityRoutes = router;