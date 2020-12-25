import { Router } from 'express';
import * as locationController from '../controllers/locationController';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/site')
	.post(locationController.addSite)
	.get(locationController.getAllSites)
	.all(generate405);
router.route('/site/:code')
	.get(locationController.getSite)
	.patch(locationController.updateSite)
	.delete(locationController.deleteSite)
	.all(generate405);

router.route('/aisle/:code')
	.post(locationController.addAisle)
	.get(locationController.getAllAislesAtSite)
	.all(generate405);
router.route('/aisle/:code/:aisle')
	.get(locationController.getAisle)
	.patch(locationController.updateAisle)
	.delete(locationController.deleteAisle)
	.all(generate405);

export const locationRoutes = router;
