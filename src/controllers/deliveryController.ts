import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { config } from '../helpers/config';
import { Delivery, IDelivery, DeliveryProduct, } from '../entities/Delivery';
import { Counter } from '../entities/Counter';
import { respond, generate500 } from '../helpers/respond';

class DeliveryQuery {
	inbound?: number;
	outbound?: number;
};

export const addDelivery = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/site/${req.body.outbound}`).then((response: AxiosResponse) => {
			const outbound = response.data.data;
			axios.get(`${config.base}/site/${req.body.inbound}`).then(async (response: AxiosResponse) => {
				const inbound = response.data.data;
				const newDelivery = new Delivery({
					status: 'Booked',
					inbound: inbound._id,
					outbound: outbound._id,
					arrivesAt: req.body.arrivesAt,
					products: []
				});
				for (const product of req.body.products) {
					const response = await axios.get(`${config.base}/product/${product.ean}`).catch(() => { return; });
					if (response && product.quantity > 0) {
						const newDeliveryProduct = await new DeliveryProduct({
							product: response.data.data._id,
							quantity: product.quantity
						});
						newDelivery.products.push(newDeliveryProduct);
					}
				}
				if (newDelivery.products.length === 0) respond(req, res, 400, 'Invalid Request Body');
				else newDelivery.save().then(() => {
					respond(req, res, 201, 'Delivery Added Successfully');
				}, async (error: Error & { name: string, code: number }) => {
					await Counter.findByIdAndUpdate(config.deliveryCounter, { $inc: { seq: -1 } });
					if (error.code === 11000) respond(req, res, 409, 'Delivery Number Already in Use');
					else if (error.name === 'ValidationError' || error.name === 'CastError') respond(req, res, 400, 'Invalid Request Body');
					else generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } }) => {
				if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Invalid Inbound Site Code Provided');
				else generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Invalid Outbound Site Code Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getDelivery = async (req: Request & { params: { delivery: number } }, res: Response): Promise<void> => {
	try {
		Delivery.findOne({ deliveryNumber: req.params.delivery }, { __v: 0 })
			.populate('inbound', '-__v')
			.populate('outbound', '-__v')
			.populate('products.product', '-__v')
			.then((doc: IDelivery | null) => {
				if (!doc) respond(req, res, 404, 'Delivery Not Found', doc);
				else respond(req, res, 200, 'Delivery Retrieved Successfully', doc);
			}, (error: Error & { name: string }) => {
				if (error.name === 'CastError') respond(req, res, 400, 'Invalid Delivery Number Provided');
				else generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getDeliveriesForSite = async (req: Request, res: Response): Promise<void> => {
	try {
		const query = {} as DeliveryQuery;
		if (req.params.type === 'inbound') query.inbound = res.locals.site._id;
		else query.outbound = res.locals.site._id;
		Delivery.find(query, { _id: 0, __v: 0, 'products._id': 0 })
			.populate('inbound', '-__v')
			.populate('outbound', '-__v')
			.populate('products.product', '-__v')
			.then((docs: IDelivery[]) => {
				respond(req, res, 200, 'Deliveries Retrieved Successfully', docs);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateDelivery = async (req: Request & { params: { delivery: number } }, res: Response): Promise<void> => {
	try {
		Delivery.updateOne({ deliveryNumber: req.params.delivery }, { '$set': { status: req.body.status } }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Invalid Delivery Number Provided');
			else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
			else respond(req, res, 200, 'Delivery Updated Successfully');
		}, (error: Error & { name: string }) => {
			if (error.name === 'ValidationError' || error.name === 'CastError') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteDelivery = async (req: Request & { params: { delivery: number } }, res: Response): Promise<void> => {
	try {
		Delivery.findOne({ deliveryNumber: req.params.delivery }).then(async (doc: IDelivery | null) => {
			if (doc) {
				await doc.remove();
				respond(req, res, 200, 'Delivery Deleted Successfully');
			}
			else respond(req, res, 400, 'Invalid Delivery Number Provided');
		}, (error: Error & { name: string }) => {
			if (error.name === 'CastError') respond(req, res, 400, 'Invalid Delivery Number Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};