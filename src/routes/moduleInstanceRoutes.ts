import { Router } from 'express';
import * as moduleInstanceController from '../controllers/moduleInstanceController';
import { isAdmin } from '../middleware/auth';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/module/site/')
	.post(moduleInstanceController.addModuleToSite)
	.all(generate405);
router.route('/module/site/:code')
	.get(moduleInstanceController.getModulesAtSite)
	.all(generate405);
router.route('/module/site/:code/:discriminator')
	.delete(moduleInstanceController.deleteModuleFromSite)
	.all(generate405);

export const moduleInstanceRoutes = router;