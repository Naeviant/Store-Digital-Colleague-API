import { Router } from 'express';
import * as locationController from '../controllers/locationController';

const router = Router();

router.post('/site', locationController.addSite);
router.get('/site', locationController.getAllSites);
router.get('/site/:code', locationController.getSite);
router.put('/site/:code', locationController.updateSite);
router.delete('/site/:code', locationController.deleteSite);

router.post('/aisle/:code', locationController.addAisle);
router.get('/aisle/:code', locationController.getAllAislesAtSite);
router.get('/aisle/:code/:aisle', locationController.getAisle);
router.put('/aisle/:code/:aisle', locationController.updateAisle);
router.delete('/aisle/:code/:aisle', locationController.deleteAisle);

export const locationRoutes = router;
