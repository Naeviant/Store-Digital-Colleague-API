import { Request, Response } from 'express';
import { hash } from 'bcrypt';
import validator from 'validator';
import { config } from '../helpers/config';
import { Customer, ICustomer } from '../entities/Customer';
import { Counter } from '../entities/Counter';
import { respond, generate500 } from '../helpers/respond';

class CustomerUpdate {
	title?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	addressNumberName?: string;
	addressStreet1?: string;
	addressStreet2?: string;
	addressCity?: string;
	addressPostcode?: string;
	mobilePhone?: string;
}

export const addCustomer = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.email || !validator.isEmail(req.body.email)) respond(req, res, 400, 'Invalid Request Body');
		else if (!req.body.mobilePhone || !validator.isMobilePhone(req.body.mobilePhone, 'en-GB')) respond(req, res, 400, 'Invalid Request Body');
		else if (!req.body.addressPostcode || !validator.isPostalCode(req.body.addressPostcode, 'GB')) respond(req, res, 400, 'Invalid Request Body');
		else hash(req.body.password, 10, (error: Error, hashedPassword: string) => {
			req.body.password = hashedPassword;
			const newCustomer = new Customer(req.body);
			newCustomer.save().then(() => {
				respond(req, res, 201, 'Customer Added Successfully');
			}, async (error: Error & { name: string, code: number }) => {
				await Counter.findByIdAndUpdate(config.customerCounter, { $inc: { seq: -1 } });
				if (error.code === 11000) respond(req, res, 409, 'Customer Number Already in Use');
				else if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
				else generate500(req, res, error);
			});
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getCustomer = async (req: Request & { params: { customer: number } }, res: Response): Promise<void> => {
	try {
		if (!Number.isInteger(Number(req.params.customer))) respond(req, res, 404, 'Customer Not Found');
		else Customer.findOne({ customerNumber: req.params.customer }, { password: 0, __v: 0 }).then((doc: ICustomer | null) => {
			if (!doc) respond(req, res, 404, 'Customer Not Found');
			else respond(req, res, 200, 'Customer Retrieved Successfully', doc);
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateCustomer = async (req: Request & { params: { customer: number } }, res: Response): Promise<void> => {
	try {
		const update = new CustomerUpdate();
		if (req.body.title) update.title = req.body.title;
		if (req.body.firstName) update.firstName = req.body.firstName;
		if (req.body.lastName) update.lastName = req.body.lastName;
		if (req.body.addressNumberName) update.addressNumberName = req.body.addressNumberName;
		if (req.body.addressStreet1) update.addressStreet1 = req.body.addressStreet1;
		if (req.body.addressStreet2) update.addressStreet2 = req.body.addressStreet2;
		if (req.body.addressCity) update.addressCity = req.body.addressCity;
		if (req.body.email && validator.isEmail(req.body.email)) update.email = req.body.email;
		if (req.body.mobilePhone && validator.isMobilePhone(req.body.mobilePhone, 'en-GB')) update.mobilePhone = req.body.mobilePhone;
		if (req.body.addressPostcode && validator.isPostalCode(req.body.addressPostcode, 'GB')) update.addressPostcode = req.body.addressPostcode;
		if (req.body.password) update.password = await hash(req.body.password, 10);
		if (!Number.isInteger(Number(req.params.customer))) respond(req, res, 400, 'Invalid Customer Number Provided');
		else if (Object.keys(update).length === 0) respond(req, res, 400, 'Invalid Request Body');
		else Customer.updateOne({ customerNumber: req.params.customer }, { '$set': update }, { runValidators: true }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Invalid Customer Number Provided');
			else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
			else respond(req, res, 200, 'Customer Updated Successfully');
		}, (error: Error & { name: string }) => {
			if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteCustomer = async (req: Request & { params: { customer: number } }, res: Response): Promise<void> => {
	try {
		if (!Number.isInteger(Number(req.params.customer))) respond(req, res, 400, 'Invalid Customer Number Provided');
		else {
			const doc = await Customer.findOne({ customerNumber: req.params.customer });
			if (doc) {
				await doc.remove();
				respond(req, res, 200, 'Customer Deleted Successfully');
			}
			else respond(req, res, 400, 'Invalid Customer Number Provided');
		}
	} catch (error) {
		generate500(req, res, error);
	}
};