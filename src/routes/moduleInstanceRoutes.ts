import { Router } from 'express';
import * as moduleInstanceController from '../controllers/moduleInstanceController';
import { isUser, isAdmin } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/module/site/')
	.post(isAdmin, moduleInstanceController.addModuleToSite)
	.all(generate405);
router.route('/module/site/:code')
	.get(moduleInstanceController.getModulesAtSite)
	.all(generate405);
router.route('/module/site/:code/:discriminator')
	.get(moduleInstanceController.getModuleAtSite)
	.delete(isAdmin, moduleInstanceController.deleteModuleFromSite)
	.all(generate405);
router.route('/module/site/:code/:aisle/:bay')
	.post(isUser, moduleInstanceController.addModuleToBay)
	.get(moduleInstanceController.getModulesInBay)
	.all(generate405);	  
router.route('/module/site/:code/:aisle/:bay/:discriminator')
	.delete(isUser, moduleInstanceController.deleteModuleFromBay)
	.all(generate405);

export const moduleInstanceRoutes = router;