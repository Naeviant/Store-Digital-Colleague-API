import express, { Router, Request, Response } from 'express';
import { config } from './helpers/config';
import { makeConnection } from './helpers/makeConnection';
import { generate404 } from './helpers/httpErrors';
import { productRoutes } from './routes/productRoutes';
import { siteRoutes } from './routes/siteRoutes';
import { locationRoutes } from './routes/locationRoutes';
import { assignmentRoutes } from './routes/assignmentRoutes';
import { userRoutes } from './routes/userRoutes';
import { moduleRoutes } from './routes/moduleRoutes';
import { moduleInstanceRoutes } from './routes/moduleInstanceRoutes';

const app = express();
const router = Router();
app.use(express.json());
app.use('/api', router);
makeConnection();

router.get('/', (req: Request, res: Response) => {
	res.json({
		status: 200
	});
});

router.use(productRoutes);
router.use(siteRoutes);
router.use(locationRoutes);
router.use(assignmentRoutes);
router.use(userRoutes);
router.use(moduleInstanceRoutes);
router.use(moduleRoutes);
router.route('*').all(generate404);

app.listen(config.port, () => {
	console.log(`Listening on Port ${config.port}`);
});