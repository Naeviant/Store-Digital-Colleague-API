import { Request, Response } from 'express';
import { Module, IModule, ModuleProduct } from '../entities/Module';
import { respond, generate500 } from '../helpers/respond';

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
			if (error.code === 11000) respond(req, res, 409, 'Module Discriminator Already in Use');
			else if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModule = async (req: Request, res: Response): Promise<void> => {
	try {
		Module.findOne({ discriminator: req.params.discriminator }, { __v: 0 }).populate({ path: 'products.product', model: 'Product', select: '-__v' }).then((doc: IModule | null) => {
			if (!doc) respond(req, res, 404, 'Module Not Found');
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
		if (!isNaN(Date.parse(req.body.startDate))) update.startDate = req.body.startDate;
		if (!isNaN(Date.parse(req.body.endDate))) update.endDate = req.body.endDate;
		if (Object.keys(update).length === 0) respond(req, res, 400, 'Invalid Request Body');
		else Module.updateOne({ discriminator: req.params.discriminator }, { '$set': update }, { runValidators: true }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Invalid Module Discriminator Provided');
			else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
			else respond(req, res, 200, 'Module Updated Successfully');
		}, (error: Error & { name: string }) => {
			if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModule = async (req: Request, res: Response): Promise<void> => {
	try {
		const doc = await Module.findOne({ discriminator: req.params.discriminator });
		if (doc) {
			await doc.remove();
			respond(req, res, 200, 'Module Deleted Successfully');
		}
		else respond(req, res, 400, 'Invalid Module Discriminator Provided');
	} catch (error) {
		generate500(req, res, error);
	}
};

export const addModuleProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.ean || !req.body.facings || !Number.isInteger(req.body.facings) || req.body.facings < 1) respond(req, res, 400, 'Invalid Request Body');
		else if (req.body.sequence && (!Number.isInteger(req.body.sequence) || req.body.sequence < 1)) respond(req, res, 400, 'Invalid Request Body');
		else {
			const newModuleProduct = new ModuleProduct({ product: res.locals.product._id, facings: req.body.facings });
			if (req.body.sequence) req.body.sequence -= 1;
			Module.updateOne({ discriminator: req.params.discriminator }, { '$push': { products: { '$each': [newModuleProduct], '$position': req.body.sequence } } }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Invalid Module Discriminator Provided');
				else respond(req, res, 200, 'Product Added to Module Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModuleProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const key = `products.${parseInt(req.params.sequence) - 1}`;
		Module.updateOne({ discriminator: req.params.discriminator }, { '$unset': { [key]: 1 } }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Invalid Module Discriminator Provided');
			else if (docs.nModified === 0) respond(req, res, 400, 'Invalid Sequence Provided');
			else Module.updateOne({ discriminator: req.params.discriminator }, { '$pull': { products: null } }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Invalid Module Discriminator Provided');
				else if (docs.nModified === 0) respond(req, res, 400, 'Invalid Sequence Provided');
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