import { Router } from 'express';
import * as customerController from '../controllers/customerController';
import { isUser } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/customer')
	.post(isUser, customerController.addCustomer)
	.all(generate405);
router.route('/customer/:customer')
	.get(isUser, customerController.getCustomer)
	.patch(isUser, customerController.updateCustomer)
	.delete(isUser, customerController.deleteCustomer)
	.all(generate405);

export const customerRoutes = router;