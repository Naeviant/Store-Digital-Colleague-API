import { Request, Response } from 'express';
import { IAssignment } from '../entities/Assignment';
import { IAisle, IBay } from '../entities/Location';
import { ICollection } from '../entities/Collection';
import { ICustomer } from '../entities/Customer';
import { IDelivery } from '../entities/Delivery';
import { IModule } from '../entities/Module';
import { IModuleInstance } from '../entities/ModuleInstance';
import { IProduct } from '../entities/Product';
import { IProductQuantity } from '../entities/ProductQuantity';
import { ISite } from '../entities/Site';
import { IUser } from '../entities/User';

type Payload = string | null | IAssignment | IAssignment[] | IAisle | IAisle[] | IBay | IBay[] | ICollection | ICollection[] | ICustomer | IDelivery | IDelivery[] | IModule | IModule[] | IModuleInstance | IModuleInstance[] | IProduct | IProduct[] | IProductQuantity | ISite | ISite[] | IUser;

export const respond = async (req: Request, res: Response, code: number, description: string, data?: Payload): Promise<void> => { 
	let status;
	switch (code) {
	case 200: status = 'OK'; break;
	case 201: status = 'Created'; break;
	case 202: status = 'Accepted'; break;
	case 400: status = 'Bad Request'; break;
	case 401: status = 'Unauthorised'; break; // No Auth Provided
	case 403: status = 'Forbidden'; break; // User Cannot Perform Action
	case 404: status = 'Not Found'; break;
	case 405: status = 'Method Not Allowed'; break;
	case 409: status = 'Conflict'; break;
	case 410: status = 'Gone'; break;
	case 418: status = 'Coming Soon'; break;
	case 422: status = 'Unprocessable Entity'; break;
	default: status = null; break;
	}
	res.status(code).send({
		code: code,
		status: status,
		description: description,
		data: data ?? []
	});
};

export const generate405 = async (req: Request, res: Response): Promise<void> => {
	res.status(405).json({
		code: 405,
		status: 'Method Not Allowed',
		description: `Cannot ${req.method} ${req.path}`,
		data: []
	});
};

export const generate500 = async (req: Request, res: Response, error: Error): Promise<void> => {
	res.status(500).json({
		code: 500,
		status: 'Internal Server Error',
		description: 'Something Went Wrong',
		data: []
	});
	throw error;
};