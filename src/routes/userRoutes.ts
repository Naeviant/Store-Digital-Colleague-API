import { Router } from 'express';
import * as userController from '../controllers/userController';
import { isAdmin } from '../middleware/auth';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/user')
	.post(isAdmin, userController.addUser)
	.all(generate405);

router.route('/user/:username')
	.get(userController.getUser)
	.patch(isAdmin, userController.updateUser)
	.delete(isAdmin, userController.deleteUser)
	.all(generate405);

router.route('/authenticate/')
	.post(userController.authenticate)
	.all(generate405);

export const userRoutes = router;