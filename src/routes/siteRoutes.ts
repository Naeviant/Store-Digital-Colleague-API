import { Router } from 'express';
import * as siteController from '../controllers/siteController';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/site')
	.post(siteController.addSite)
	.get(siteController.getAllSites)
	.all(generate405);
router.route('/site/:code')
	.get(siteController.getSite)
	.patch(siteController.updateSite)
	.delete(siteController.deleteSite)
	.all(generate405);

export const siteRoutes = router;
