import { Request, Response } from 'express';
import { ProductQuantity, IProductQuantity } from '../entities/ProductQuantity';
import { respond, generate500 } from '../helpers/respond';

class QuantityUpdate {
	'$set'?: { quantity: number };
	'$inc'?: { quantity: number };
}

export const getQuantity = async (req: Request, res: Response): Promise<void> => {
	try {
		ProductQuantity.findOne({ site: res.locals.site._id, product: res.locals.product._id }, { __v: 0 })
			.populate({ path: 'site', select: '-__v'})
			.populate({ path: 'product', select: '-__v'})
			.then((doc: IProductQuantity | null) => {
				if (!doc) respond(req, res, 400, 'Invalid Site Code or EAN Provided');
				else respond(req, res, 200, 'Product Quantity Retrieved Successfully', doc);
			}, (error: Error) => {
				generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const setQuantity = async (req: Request, res: Response): Promise<void> => {
	try {
		if (Object.keys(req.body).length === 0) respond(req, res, 400, 'Invalid Request Body');
		else {
			const update = {} as QuantityUpdate;
			if (req.body.method === 'increment') update['$inc'] = { quantity: req.body.quantity };
			else if (req.body.method === 'decrement') update['$inc'] = { quantity: (0 - req.body.quantity) };
			else update['$set'] = { quantity: req.body.quantity };
			ProductQuantity.updateOne({ site: res.locals.site._id, product: res.locals.product._id }, update).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Invalid Site Code or EAN Provided');
				else respond(req, res, 200, 'Product Quantity Updated Successfully');
			}, (error: Error & { name: string }) => {
				if (error.name === 'CastError') respond(req, res, 400, 'Invalid Request Body');
				else generate500(req, res, error);
			});
		}
	} catch (error) {
		generate500(req, res, error);
	}
};