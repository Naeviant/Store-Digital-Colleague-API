import express, { Router, Request, Response } from 'express';
import { config } from './helpers/config';
import { makeConnection } from './helpers/makeConnection';
import { respond } from './helpers/respond';
import { productRoutes } from './routes/productRoutes';
import { productQuantityRoutes } from './routes/productQuantityRoutes';
import { siteRoutes } from './routes/siteRoutes';
import { locationRoutes } from './routes/locationRoutes';
import { assignmentRoutes } from './routes/assignmentRoutes';
import { userRoutes } from './routes/userRoutes';
import { moduleRoutes } from './routes/moduleRoutes';
import { moduleInstanceRoutes } from './routes/moduleInstanceRoutes';
import { customerRoutes } from './routes/customerRoutes';
import { collectionRoutes } from './routes/collectionRoutes';

const app = express();
const router = Router();
app.use(express.json());
app.use('/api', router);
makeConnection();

router.get('/', async (req: Request, res: Response) => {
	respond(req, res, 200, 'API Online');
});

router.use(productQuantityRoutes);
router.use(productRoutes);
router.use(siteRoutes);
router.use(locationRoutes);
router.use(assignmentRoutes);
router.use(userRoutes);
router.use(moduleInstanceRoutes);
router.use(moduleRoutes);
router.use(customerRoutes);
router.use(collectionRoutes);

router.all('*', (req: Request, res: Response) => {
	respond(req, res, 404, `Cannot ${req.method} ${req.path}`);
});

app.listen(config.port, () => {
	console.log(`Listening on Port ${config.port}`);
});