import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../helpers/config';
import { AuthResponse } from '../helpers/generateResponse';
import { generate500 } from '../helpers/httpErrors';

export const isAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const auth = req.header('Authorization');
		if (auth) {
			verify(auth, config.jwtSecret, (error, decoded) => {
				if (error) res.status(401).send(new AuthResponse(401, 'You Are Not Authorized'));
				else next();
			});
		}
	}
	catch (error) {
		generate500(req, res, error);
	}
};