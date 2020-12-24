import { Router } from 'express';
import * as locationController from '../controllers/locationController';

const router = Router();

router.post('/site', locationController.addSite);
router.get('/site', locationController.getAllSites);
router.get('/site/:code', locationController.getSite);
router.put('/site/:code', locationController.updateSite);
router.delete('/site/:code', locationController.deleteSite);

export const locationRoutes = router;
