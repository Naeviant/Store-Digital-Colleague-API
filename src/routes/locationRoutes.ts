import { Router } from 'express';
import * as locationController from '../controllers/locationController';
import { isManager } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/aisle/:code')
	.post(isManager, locationController.addAisle)
	.get(locationController.getAllAislesAtSite)
	.all(generate405);
router.route('/aisle/:code/:aisle')
	.get(locationController.getAisle)
	.patch(isManager, locationController.updateAisle)
	.delete(isManager, locationController.deleteAisle)
	.all(generate405);

router.route('/bay/:code/:aisle')
	.post(isManager, locationController.addBay)
	.get(locationController.getAllBaysInAisle)
	.all(generate405);
router.route('/bay/:code/:aisle/:bay')
	.get(locationController.getBay)
	.patch(isManager, locationController.updateBay)
	.delete(isManager, locationController.deleteBay)
	.all(generate405);

export const locationRoutes = router;