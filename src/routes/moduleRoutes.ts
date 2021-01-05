import { Router } from 'express';
import * as moduleController from '../controllers/moduleController';
import { isAdmin } from '../middleware/auth';
import { getProduct } from '../middleware/getProduct';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/module')
	.post(isAdmin, moduleController.addModule)
	.get(moduleController.getAllModules)
	.all(generate405);
router.route('/module/:discriminator')
	.post(isAdmin, getProduct, moduleController.addModuleProduct)
	.get(moduleController.getModule)
	.patch(moduleController.updateModule)
	.delete(isAdmin, moduleController.deleteModule)
	.all(generate405);
router.route('/module/:discriminator/:sequence')
	.delete(isAdmin, moduleController.deleteModuleProduct)
	.all(generate405);

export const moduleRoutes = router;