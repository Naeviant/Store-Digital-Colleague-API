import { Request, Response } from 'express';
import { ProductQuantity, IProductQuantity } from '../entities/ProductQuantity';
import { respond, generate500 } from '../helpers/respond';

export const getQuantity = async (req: Request, res: Response): Promise<void> => {
	try {
		ProductQuantity.findOne({ site: res.locals.site._id, product: res.locals.product._id }, { __v: 0 })
			.populate({ path: 'site', select: '-__v'})
			.populate({ path: 'product', select: '-__v'})
			.then((doc: IProductQuantity | null) => {
				if (!doc) respond(req, res, 400, 'Cannot Get Product Quantity: Invalid Site Code or EAN Provided');
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
		if (!Number.isInteger(parseInt(req.body.quantity))) respond(req, res, 400, 'Cannot Set Product Quantity: Invalid Request Body'); 
		else ProductQuantity.updateOne({ site: res.locals.site._id, product: res.locals.product._id }, { '$set': { quantity: req.body.quantity } }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Cannot Set Product Quantity: Invalid Site Code or EAN Provided');
			else respond(req, res, 200, 'Product Quantity Updated Successfully');
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};