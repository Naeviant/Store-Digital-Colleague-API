import { Router } from 'express';
import * as auditLogController from '../controllers/auditLogController';
import { isUser, isManager } from '../middleware/auth';
import { getSite } from '../middleware/getSite';
import { generate405 } from '../helpers/respond';

const router = Router();

router.route('/audit/:code')
	.post(isUser, getSite, auditLogController.addLog)
	.get(isManager, getSite, auditLogController.getLog)
	.all(generate405);

export const auditLogRoutes = router;