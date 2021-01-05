import { Router } from 'express';
import * as productQuantityController from '../controllers/productQuantityController';
import { isUser } from '../middleware/auth';
import { getSite } from '../middleware/getSite';
import { getProduct } from '../middleware/getProduct';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/product/quantity/:code/:ean')
	.get(getSite, getProduct, productQuantityController.getQuantity)
	.patch(isUser, getSite, getProduct, productQuantityController.setQuantity)
	.all(generate405);

export const productQuantityRoutes = router;