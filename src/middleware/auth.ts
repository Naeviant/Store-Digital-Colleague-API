import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../helpers/config';
import { respond, generate500 } from '../helpers/respond';

interface UserPermissions {
	userType: string;
}

export const isUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const auth = req.header('Authorization');
		if (auth) {			
			const decoded = verify(auth, config.jwtSecret);
			if (decoded) next();
			else respond(req, res, 401, 'Not Authorized to Perform Action');
		}
		else respond(req, res, 401, 'Not Authorized to Perform Action');
	}
	catch (error) {
		generate500(req, res, error);
	}
};

export const isManager = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const auth = req.header('Authorization');
		if (auth) {			
			const decoded = verify(auth, config.jwtSecret);
			if (decoded && ((decoded as UserPermissions).userType === 'Manager' || (decoded as UserPermissions).userType === 'Admin')) next();
			else respond(req, res, 401, 'Not Authorized to Perform Action');
		}
		else respond(req, res, 401, 'Not Authorized to Perform Action');
	}
	catch (error) {
		generate500(req, res, error);
	}
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const auth = req.header('Authorization');
		if (auth) {			
			const decoded = verify(auth, config.jwtSecret);
			if (decoded && (decoded as UserPermissions).userType === 'Admin') next();
			else respond(req, res, 401, 'Not Authorized to Perform Action');
		}
		else respond(req, res, 401, 'Not Authorized to Perform Action');
	}
	catch (error) {
		generate500(req, res, error);
	}
};