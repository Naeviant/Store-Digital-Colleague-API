import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { AuditLog, IAuditLog } from '../entities/AuditLog';
import { respond, generate500 } from '../helpers/respond';

export const addLog = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/user/${req.body.username}`).then((response: AxiosResponse) => {
			const user = response.data.data;
			const newLog = new AuditLog({
				site: res.locals.site._id,
				user: user._id,
				action: req.body.action,
				timestamp: Date.now()
			});
			newLog.save().then(() => {
				respond(req, res, 201, 'Action Logged Successfully');
			}, (error: Error & { name: string, code: number }) => {
				if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
				else generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Invalid Username Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getLog = async (req: Request, res: Response): Promise<void> => {
	try {
		AuditLog.find({ site: res.locals.site._id }, { _id: 0, __v: 0 })
			.populate({ path: 'site', select: '-_id -__v'})
			.populate({ path: 'user', select: '-_id -__v -password', populate: { path: 'site', select: '-_id -__v' } })
			.then((docs: IAuditLog[] | null) => {
				respond(req, res, 200, 'Audit Logs Retrieved Successfully', docs);
			}, (error: Error) => {
				generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};