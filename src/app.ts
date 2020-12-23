import express, { Router, Request, Response } from 'express';
import { config } from './helpers/config';
import { makeConnection } from './helpers/makeConnection';
import { productRoutes } from './routes/productRoutes';

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

app.listen(config.port, () => {
	console.log(`Listening on Port ${config.port}`);
});
