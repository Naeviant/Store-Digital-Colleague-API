import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { ProductQuantity, IProductQuantity } from '../entities/ProductQuantity';
import { ProductQuantityResponse } from '../helpers/generateResponse';
import { generate500 } from '../helpers/httpErrors';

export const getQuantity = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.ean) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Get Product Quantity: Invalid Site Code or EAN Provided')); 
		else axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/product/${req.params.ean}`).then((response: AxiosResponse) => {
				const product = response.data.data;
				ProductQuantity.findOne({ site: site._id, product: product._id }, { __v: 0 })
					.populate({ path: 'site', select: '-__v'})
					.populate({ path: 'product', select: '-__v'})
					.then((doc: IProductQuantity | null) => {
						if (!doc) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Get Product Quantity: Invalid Site Code or EAN Provided'));
						else res.status(200).send(new ProductQuantityResponse(200, 'Product Quantity Retrieved Successfully', doc));
					}, (error: Error & { code: number } | null) => {
						if (error) generate500(req, res, error);
					});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Get Product Quantity: Invalid EAN Provided'));
				else if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Get Product Quantity: Invalid Site Code Provided'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const setQuantity = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.ean) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Set Product Quantity: Invalid Site Code or EAN Provided')); 
		else if (!req.body.quantity) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Set Product Quantity: Invalid Request Body')); 
		else axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/product/${req.params.ean}`).then((response: AxiosResponse) => {
				const product = response.data.data;
				ProductQuantity.updateOne({ site: site._id, product: product._id }, { '$set': { quantity: req.body.quantity } }).then((docs: { n: number, nModified: number }) => {
					if (docs.n === 0) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Set Product Quantity: Invalid Site Code or EAN Provided'));
					else res.status(200).send(new ProductQuantityResponse(200, 'Product Quantity Updated Successfully'));
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Set Product Quantity: Invalid EAN Provided'));
				else if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ProductQuantityResponse(400, 'Cannot Set Product Quantity: Invalid Site Code Provided'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};