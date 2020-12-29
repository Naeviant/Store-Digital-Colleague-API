import { Request, Response } from 'express';

export const generate500 = async (req: Request, res: Response, error: Error): Promise<void> => {
	res.json({
		code: 500,
		status: 'Internal Server Error',
		description: 'Something Went Wrong',
		data: []
	});
	throw error;
};