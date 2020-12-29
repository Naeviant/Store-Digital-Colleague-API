import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { Module, IModule } from '../entities/Module';
import { respond } from '../helpers/respond';
import { generate500 } from '../helpers/httpErrors';

class ModuleUpdate {
	name?: string;
	startDate?: Date;
	endDate?: Date;
}

export const addModule = async (req: Request, res: Response): Promise<void> => {
	try {
		const newModule = new Module(req.body);
		req.body.parts = [];
		newModule.save().then(() => {
			respond(req, res, 201, 'Module Added Successfully');
		}, (error: Error & { name: string, code: number }) => {
			if (error.code === 11000) respond(req, res, 409, 'Cannot Add Module: Discriminator Already in Use');
			else if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Add Module: Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModule = async (req: Request, res: Response): Promise<void> => {
	try {
		Module.findOne({ discriminator: req.params.discriminator }, { __v: 0 }).populate({ path: 'products.product', model: 'Product', select: '-__v' }).then((doc: IModule | null) => {
			if (!doc) respond(req, res, 404, 'Cannot Get Module: Module Not Found');
			else respond(req, res, 200, 'Module Retrieved Successfully', doc);
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAllModules = async (req: Request, res: Response): Promise<void> => {
	try {
		Module.find({}, { _id: 0, __v: 0, 'products._id': 0 }).populate({ path: 'products.product', model: 'Product', select: '-_id -__v' }).then((docs: IModule[] | null) => {
			respond(req, res, 200, 'Modules Retrieved Successfully', docs);
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateModule = async (req: Request, res: Response): Promise<void> => {
	try {
		const update = new ModuleUpdate();
		if (req.body.name) update.name = req.body.name;
		if (req.body.startDate) update.startDate = req.body.startDate;
		if (req.body.endDate) update.endDate = req.body.endDate;
		if (Object.keys(update).length === 0) respond(req, res, 400, 'Cannot Update Module: Invalid Request Body');
		else Module.updateOne({ discriminator: req.params.discriminator }, { '$set': update }, { runValidators: true }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Cannot Update Module: Invalid Discriminator Provided');
			else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
			else respond(req, res, 200, 'Module Updated Successfully');
		}, (error: Error & { name: string }) => {
			if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Update Module: Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModule = async (req: Request, res: Response): Promise<void> => {
	try {
		Module.deleteOne({ discriminator: req.params.discriminator }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) respond(req, res, 400, 'Cannot Delete Module: Invalid Discriminator Provided');
			else respond(req, res, 200, 'Module Deleted Successfully');
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const addModuleProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.ean || !req.body.facings) respond(req, res, 400, 'Cannot Add Product to Module: Invalid Request Body');
		else axios.get(`${config.base}/product/${req.body.ean}`).then((response: AxiosResponse) => {
			const product = response.data.data;
			const newModuleProduct = { product: product._id, facings: req.body.facings };
			if (req.body.sequence) req.body.sequence -= 1;
			Module.updateOne({ discriminator: req.params.discriminator }, { '$push': { products: { '$each': [newModuleProduct], '$position': req.body.sequence } } }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Cannot Add Product to Module: Invalid Discriminator Provided');
				else respond(req, res, 200, 'Product Added to Module Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Add Product to Module: Invalid Discriminator Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModuleProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const key = `products.${parseInt(req.params.sequence) - 1}`;
			Module.updateOne({ discriminator: req.params.discriminator }, { '$unset': { [key]: 1 } }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Cannot Delete Product from Module: Invalid Discriminator Provided');
			else if (docs.nModified === 0) respond(req, res, 400, 'Cannot Delete Product from Module: Invalid Sequence Provided');
			else Module.updateOne({ discriminator: req.params.discriminator }, { '$pull': { products: null } }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Cannot Delete Product from Module: Invalid Discriminator Provided');
				else if (docs.nModified === 0) respond(req, res, 400, 'Cannot Delete Product from Module: Invalid Sequence Provided');
				else respond(req, res, 200, 'Product Deleted from Module Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};