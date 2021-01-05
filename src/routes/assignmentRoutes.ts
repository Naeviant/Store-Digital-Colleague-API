import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController';
import { isUser } from '../middleware/auth';
import { getSite } from '../middleware/getSite';
import { getBay } from '../middleware/getBay';
import { getProduct } from '../middleware/getProduct';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/assignment/location/:code/:aisle/:bay/:type')
	.get(getBay, assignmentController.getAssignmentsByLocation)
	.all(generate405);
router.route('/assignment/product/:code/:ean')
	.get(getSite, getProduct, assignmentController.getAssignmentsByProduct)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay/:type/:ean')
	.delete(isUser, getBay, getProduct, assignmentController.deleteAssignment)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay')
	.post(isUser, getBay, getProduct, assignmentController.addAssignment)
	.all(generate405);

export const assignmentRoutes = router;