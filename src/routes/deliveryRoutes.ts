import { Router } from 'express';
import * as deliveryController from '../controllers/deliveryController';
import { isUser } from '../middleware/auth';
import { getSite } from '../middleware/getSite';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/delivery')
	.post(isUser, deliveryController.addDelivery)
	.all(generate405);
router.route('/delivery/:type(inbound|outbound)/:code')
	.get(isUser, getSite, deliveryController.getDeliveriesForSite)
	.all(generate405);
router.route('/delivery/:delivery')
	.get(isUser, deliveryController.getDelivery)
	.patch(isUser, deliveryController.updateDelivery)
	.delete(isUser, deliveryController.deleteDelivery)
	.all(generate405);

export const deliveryRoutes = router;