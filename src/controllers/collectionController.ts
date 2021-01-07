import { Request, Response } from 'express';
import axios from 'axios';
import { config } from '../helpers/config';
import { Collection, ICollection, CollectionProduct, } from '../entities/Collection';
import { Counter } from '../entities/Counter';
import { respond, generate500 } from '../helpers/respond';

export const addCollection = async (req: Request, res: Response): Promise<void> => {
	try {
		const newCollection = new Collection({
			site: res.locals.site._id,
			status: 'Not Started',
			customer: res.locals.customer._id,
			placedAt: new Date(),
			products: []
		});
		for (const product of req.body.products) {
			const response = await axios.get(`${config.base}/product/${product.ean}`).catch(() => { return; });
			if (response && product.quantity > 0) {
				const newCollectionProduct = await new CollectionProduct({
					product: response.data.data._id,
					quantityOrdered: product.quantity,
					quantityPicked: 0
				});
				newCollection.products.push(newCollectionProduct);
			}
		}
		if (newCollection.products.length === 0) respond(req, res, 400, 'Invalid Request Body');
		else newCollection.save().then((doc: ICollection) => {
			respond(req, res, 201, 'Collection Added Successfully', doc.collectionNumber);
		}, async (error: Error & { name: string, code: number }) => {
			await Counter.findByIdAndUpdate(config.collectionCounter, { $inc: { seq: -1 } });
			if (error.code === 11000) respond(req, res, 409, 'Collection Number Already in Use');
			else if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getCollection = async (req: Request & { params: { collection: number } }, res: Response): Promise<void> => {
	try {
		Collection.findOne({ collectionNumber: req.params.collection }, { __v: 0 })
			.populate('site', '-__v')
			.populate('customer', '-__v -password')
			.populate('products.product', '-__v')
			.then((doc: ICollection | null) => {
				if (!doc) respond(req, res, 404, 'Collection Not Found', doc);
				else respond(req, res, 200, 'Collection Retrieved Successfully', doc);
			}, (error: Error & { name: string }) => {
				if (error.name === 'CastError') respond(req, res, 400, 'Invalid Collection Number Provided');
				else generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getCollectionsForCustomer = async (req: Request, res: Response): Promise<void> => {
	try {
		Collection.find({ customer: res.locals.customer._id }, { _id: 0, __v: 0, 'products._id': 0 })
			.populate('site', '-_id -__v')
			.populate('customer', '-_id -__v -password')
			.populate('products.product', '-_id -__v')
			.then((docs: ICollection[]) => {
				respond(req, res, 200, 'Collections Retrieved Successfully', docs);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getCollectionsAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		Collection.find({ site: res.locals.site._id }, { _id: 0, __v: 0, 'products._id': 0 })
			.populate('site', '-_id -__v')
			.populate('customer', '-_id -__v -password')
			.populate('products.product', '-_id -__v')
			.then((docs: ICollection[]) => {
				respond(req, res, 200, 'Collections Retrieved Successfully', docs);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateCollection = async (req: Request & { params: { collection: number } }, res: Response): Promise<void> => {
	try {
		Collection.findOne({ collectionNumber: req.params.collection }).populate('products.product', '-__v').then(async (doc: ICollection | null) => {
			if (!doc) respond(req, res, 400, 'Invalid Collection Number Provided');
			else if (!req.body.products && !req.body.status) respond(req, res, 400, 'Invalid Request Body');
			else {
				for (const product of req.body.products) {
					const response = await axios.get(`${config.base}/product/${product.ean}`).catch(() => { return; });
					if (response && product.quantity >= 0) {
						const index = doc.products.map((x) => { return x.product._id; }).indexOf(response.data.data._id);
						if (product.quantity > doc.products[index].quantityOrdered) doc.products[index].quantityPicked = doc.products[index].quantityOrdered;
						else doc.products[index].quantityPicked = product.quantity;
					}
				}
				if (['Not Started', 'In Progress', 'Awaiting Collection', 'Collected'].indexOf(req.body.status) > -1) doc.status = req.body.status;
				doc.save();
				respond(req, res, 200, 'Collection Updated Successfully');
			}
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteCollection = async (req: Request & { params: { collection: number } }, res: Response): Promise<void> => {
	try {
		Collection.findOne({ collectionNumber: req.params.collection }).then(async (doc: ICollection | null) => {
			if (doc) {
				await doc.remove();
				respond(req, res, 200, 'Collection Deleted Successfully');
			}
			else respond(req, res, 400, 'Invalid Collection Number Provided');
		}, (error: Error & { name: string }) => {
			if (error.name === 'CastError') respond(req, res, 400, 'Invalid Collection Number Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};