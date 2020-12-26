import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/assignment/location/:code/:aisle/:bay')
	.get(assignmentController.getAssignmentsByLocation)
	.all(generate405);
router.route('/assignment/product/:code/:ean')
	.get(assignmentController.getAssignmentsByProduct)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay/:ean')
	.delete(assignmentController.deleteAssignment)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay')
	.post(assignmentController.addAssignment)
	.all(generate405);

export const assignmentRoutes = router;
