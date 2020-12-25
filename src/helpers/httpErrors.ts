import { Request, Response } from 'express';

export const generate404 = async (req: Request, res: Response): Promise<void> => {
	res.json({
		code: 404,
		status: 'Not Found',
		description: `Cannot ${req.method} ${req.path}.`,
		data: []
	});
};

export const generate405 = async (req: Request, res: Response): Promise<void> => {
	res.json({
		code: 405,
		status: 'Method Not Allowed',
		description: `Cannot ${req.method} ${req.path}.`,
		data: []
	});
};