import { Request, Response, NextFunction } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { respond, generate500 } from '../helpers/respond';

export const getBay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
		res.locals.bay = response.data.data;
		next();
	}).catch((error: Error & { response: { status: number } }) => {
		if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Invalid Site Code, Aisle Number or Bay Number Provided');
		else generate500(req, res, error);
	});
};