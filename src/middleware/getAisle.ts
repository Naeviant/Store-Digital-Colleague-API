import { Request, Response, NextFunction } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { respond, generate500 } from '../helpers/respond';

export const getAisle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	axios.get(`${config.base}/aisle/${req.params.code}/${req.params.aisle}`).then((response: AxiosResponse) => {
		res.locals.aisle = response.data.data;
		next();
	}).catch((error: Error & { response: { status: number } }) => {
		if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Invalid Site Code or Aisle Number Provided');
		else generate500(req, res, error);
	});
};