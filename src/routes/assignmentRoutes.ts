import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController';
import { isUser } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/assignment/location/:code/:aisle/:bay/:type')
	.get(assignmentController.getAssignmentsByLocation)
	.all(generate405);
router.route('/assignment/product/:code/:ean')
	.get(assignmentController.getAssignmentsByProduct)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay/:type/:ean')
	.delete(isUser, assignmentController.deleteAssignment)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay')
	.post(isUser, assignmentController.addAssignment)
	.all(generate405);

export const assignmentRoutes = router;