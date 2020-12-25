import { Router } from 'express';
import * as locationController from '../controllers/siteController';
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

export const locationRoutes = router;
