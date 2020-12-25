import express, { Router, Request, Response } from 'express';
import { config } from './helpers/config';
import { makeConnection } from './helpers/makeConnection';
import { generate404 } from './helpers/httpErrors';
import { productRoutes } from './routes/productRoutes';
import { locationRoutes } from './routes/locationRoutes';

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
router.use(locationRoutes);
router.route('*').all(generate404);

app.listen(config.port, () => {
	console.log(`Listening on Port ${config.port}`);
});
