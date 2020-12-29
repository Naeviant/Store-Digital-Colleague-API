import { Router } from 'express';
import * as siteController from '../controllers/siteController';
import { isAdmin } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/site')
	.post(isAdmin, siteController.addSite)
	.get(siteController.getAllSites)
	.all(generate405);
router.route('/site/:code')
	.get(siteController.getSite)
	.patch(isAdmin, siteController.updateSite)
	.delete(isAdmin, siteController.deleteSite)
	.all(generate405);

export const siteRoutes = router;