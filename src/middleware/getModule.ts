import { Request, Response, NextFunction } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { respond, generate500 } from '../helpers/respond';

export const getModule = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	axios.get(`${config.base}/module/${req.params.discriminator ?? req.body.discriminator}`).then((response: AxiosResponse) => {
		res.locals.module = response.data.data;
		next();
	}).catch((error: Error & { response: { status: number } }) => {
		if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Invalid Module Discriminator Provided');
		else generate500(req, res, error);
	});
};