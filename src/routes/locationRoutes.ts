import { Router } from 'express';
import * as locationController from '../controllers/locationController';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/aisle/:code')
	.post(locationController.addAisle)
	.get(locationController.getAllAislesAtSite)
	.all(generate405);
router.route('/aisle/:code/:aisle')
	.get(locationController.getAisle)
	.patch(locationController.updateAisle)
	.delete(locationController.deleteAisle)
	.all(generate405);

router.route('/bay/:code/:aisle')
	.post(locationController.addBay)
	.get(locationController.getAllBaysInAisle)
	.all(generate405);
router.route('/bay/:code/:aisle/:bay')
	.get(locationController.getBay)
	.patch(locationController.updateBay)
	.delete(locationController.deleteBay)
	.all(generate405);

export const locationRoutes = router;
