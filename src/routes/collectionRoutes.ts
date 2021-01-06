import { Router } from 'express';
import * as collectionController from '../controllers/collectionController';
import { isUser } from '../middleware/auth';
import { getSite } from '../middleware/getSite';
import { getCustomer } from '../middleware/getCustomer';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/collection')
	.post(isUser, getSite, getCustomer, collectionController.addCollection)
	.all(generate405);
router.route('/collection/site/:code')
	.get(isUser, getSite, collectionController.getCollectionsAtSite)
	.all(generate405);
router.route('/collection/customer/:customer')
	.get(isUser, getCustomer, collectionController.getCollectionsForCustomer)
	.all(generate405);
router.route('/collection/:collection')
	.get(isUser, collectionController.getCollection)
	.patch(isUser, collectionController.updateCollection)
	.delete(isUser, collectionController.deleteCollection)
	.all(generate405);

export const collectionRoutes = router;