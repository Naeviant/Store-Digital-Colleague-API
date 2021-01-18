import { Router } from 'express';
import * as moduleInstanceController from '../controllers/moduleInstanceController';
import { isUser, isAdmin } from '../middleware/auth';
import { getSite } from '../middleware/getSite';
import { getBay } from '../middleware/getBay';
import { getModule } from '../middleware/getModule';
import { getProduct } from '../middleware/getProduct';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/module/site/')
	.post(isAdmin, getSite, getModule, moduleInstanceController.addModuleToSite)
	.all(generate405);
router.route('/module/site/:code')
	.get(getSite, moduleInstanceController.getModulesAtSite)
	.all(generate405);
router.route('/module/site/:code/product/:ean')
	.get(getSite, getProduct, moduleInstanceController.getProductModulesAtSite)
	.all(generate405);
router.route('/module/site/:code/:discriminator')
	.get(getSite, getModule, moduleInstanceController.getModuleAtSite)
	.delete(isAdmin, getSite, getModule, moduleInstanceController.deleteModuleFromSite)
	.all(generate405);
router.route('/module/site/:code/:aisle/:bay')
	.post(isUser, getBay, getModule, moduleInstanceController.addModuleToBay)
	.get(getBay, moduleInstanceController.getModulesInBay)
	.all(generate405);	  
router.route('/module/site/:code/:aisle/:bay/:discriminator')
	.delete(isUser, getSite, getModule, moduleInstanceController.deleteModuleFromBay)
	.all(generate405);

export const moduleInstanceRoutes = router;