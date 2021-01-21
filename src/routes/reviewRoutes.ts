import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import { isAdmin } from '../middleware/auth';
import { getCustomer } from '../middleware/getCustomer';
import { getProduct } from '../middleware/getProduct';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/review')
	.post(getCustomer, getProduct, reviewController.addReview)
	.all(generate405);
router.route('/review/product/:ean')
	.get(getProduct, reviewController.getProductReviews)
	.all(generate405);
router.route('/review/customer/:customer')
	.get(getCustomer, reviewController.getCustomerReviews)
	.all(generate405);
router.route('/review/:customer/:ean')
	.delete(isAdmin, getCustomer, getProduct, reviewController.deleteReviews)
	.all(generate405);

export const reviewRoutes = router;