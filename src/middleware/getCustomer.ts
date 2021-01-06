import { Request, Response, NextFunction } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { respond, generate500 } from '../helpers/respond';

export const getCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	axios.get(`${config.base}/customer/${req.params.customer ?? req.body.customer}`, { headers: { Authorization: req.header('Authorization') } }).then((response: AxiosResponse) => {
		res.locals.customer = response.data.data;
		next();
	}).catch((error: Error & { response: { status: number } }) => {
		if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Invalid Customer Number Provided Provided');
		else generate500(req, res, error);
	});
};