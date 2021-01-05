import { Router } from 'express';
import * as locationController from '../controllers/locationController';
import { isManager } from '../middleware/auth';
import { getSite } from '../middleware/getSite';
import { getAisle } from '../middleware/getAisle';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/aisle/:code')
	.post(isManager, getSite, locationController.addAisle)
	.get(getSite, locationController.getAllAislesAtSite)
	.all(generate405);
router.route('/aisle/:code/:aisle')
	.get(getSite, locationController.getAisle)
	.patch(isManager, getSite, locationController.updateAisle)
	.delete(isManager, getSite, locationController.deleteAisle)
	.all(generate405);

router.route('/bay/:code/:aisle')
	.post(isManager, getAisle, locationController.addBay)
	.get(getAisle, locationController.getAllBaysInAisle)
	.all(generate405);
router.route('/bay/:code/:aisle/:bay')
	.get(getAisle, locationController.getBay)
	.patch(isManager, getAisle, locationController.updateBay)
	.delete(isManager, getAisle, locationController.deleteBay)
	.all(generate405);

export const locationRoutes = router;