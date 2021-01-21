import { Request, Response } from 'express';
import { Review, IReview } from '../entities/Review';
import { respond, generate500 } from '../helpers/respond';

export const addReview = async (req: Request, res: Response): Promise<void> => {
	try {
		const newReview = new Review({
			customer: res.locals.customer,
			product: res.locals.product,
			rating: req.body.rating,
			review: req.body.review,
			timestamp: Date.now()
		});
		newReview.save().then(() => {
			respond(req, res, 201, 'Review Added Successfully');
		}, (error: Error & { name: string, code: number }) => {
			if (error.name === 'ValidationError' || error.name === 'Cast Error') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
	try {
		Review.find({ product: res.locals.product._id }, { _id: 0, __v: 0 }).populate('customer', 'title firstName lastName customerNumber').populate('product', '-__v').then((docs: IReview[]) => {
			respond(req, res, 200, 'Reviews Retrieved Successfully', docs);
		}, (error: Error & { name: string }) => {
			if (error.name === 'CastError') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getCustomerReviews = async (req: Request, res: Response): Promise<void> => {
	try {
		Review.find({ customer: res.locals.customer._id }, { _id: 0, __v: 0 }).populate('customer', 'title firstName lastName customerNumber').populate('product', '-__v').then((docs: IReview[]) => {
			respond(req, res, 200, 'Reviews Retrieved Successfully', docs);
		}, (error: Error & { name: string }) => {
			if (error.name === 'CastError') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteReviews = async (req: Request, res: Response): Promise<void> => {
	try {
		Review.deleteMany({ customer: res.locals.customer._id, product: res.locals.product._id }).then(() => {
			respond(req, res, 200, 'Reviews Deleted Successfully');
		});
	}
	catch (error) {
		generate500(req, res, error);
	}
};