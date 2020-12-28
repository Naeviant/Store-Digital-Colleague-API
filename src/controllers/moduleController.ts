import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { Module, IModule } from '../entities/Module';
import { ModuleResponse  } from '../helpers/generateResponse';
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
			res.status(201).send(new ModuleResponse(201, 'Module Added Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error && error.code === 11000) res.status(409).send(new ModuleResponse(409, 'Cannot Add Module: Discriminator Already in Use'));
			else if (error) res.status(400).send(new ModuleResponse(400, 'Cannot Add Module: Invalid Request Body'));
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModule = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.discriminator) res.status(400).send(new ModuleResponse(400, 'Cannot Get Module: Invalid Discriminator Provided'));
		Module.findOne({ discriminator: req.params.discriminator }, { __v: 0 }).then((doc: IModule | null) => {
			if (!doc) res.status(404).send(new ModuleResponse(404, 'Cannot Get Module: Module Not Found'));
			else res.status(200).send(new ModuleResponse(200, 'Module Retrieved Successfully', doc));
		}, (error: Error & { code: number } | null) => {
			if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAllModules = async (req: Request, res: Response): Promise<void> => {
	try {
		Module.find({}, { _id: 0, __v: 0 }).then((docs: IModule[] | null) => {
			res.status(200).send(new ModuleResponse(200, 'Modules Retrieved Successfully', docs));
		}, (error: Error & { code: number } | null) => {
			if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateModule = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.discriminator) res.status(400).send(new ModuleResponse(400, 'Cannot Update Module: Invalid Discriminator Provided'));
		const update = new ModuleUpdate();
		if (req.body.name) update.name = req.body.name;
		if (req.body.startDate) update.startDate = req.body.startDate;
		if (req.body.endDate) update.endDate = req.body.endDate;
		if (Object.keys(update).length === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Update Module: Invalid Request Body'));
		Module.updateOne({ discriminator: req.params.discriminator }, { '$set': update }, { runValidators: true }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Update Module: Invalid Discriminator Provided'));
			else if (docs.nModified === 0) res.status(200).send(new ModuleResponse(200, 'No Changes Required'));
			else res.status(200).send(new ModuleResponse(200, 'Module Updated Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error && error.name === 'ValidationError') res.status(400).send(new ModuleResponse(400, 'Cannot Update Module: Invalid Request Body'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModule = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.discriminator) res.status(400).send(new ModuleResponse(400, 'Cannot Delete Module: Invalid Discriminator Provided'));
		Module.deleteOne({ discriminator: req.params.discriminator }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Delete Module: Invalid Discriminator Provided'));
			else res.status(200).send(new ModuleResponse(200, 'Module Deleted Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const addModuleProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.discriminator) res.status(400).send(new ModuleResponse(400, 'Cannot Add Product to Module: Invalid Discriminator Provided'));
		else if (!req.body.ean || !req.body.facings) res.status(400).send(new ModuleResponse(400, 'Cannot Add Product to Module: Invalid Request Body'));
		else axios.get(`${config.base}/product/${req.body.ean}`).then((response: AxiosResponse) => {
			const product = response.data.data;
			const newModuleProduct = { product: product._id, facings: req.body.facings };
			if (req.body.sequence) req.body.sequence -= 1;
			Module.updateOne({ discriminator: req.params.discriminator }, { '$push': { products: { '$each': [newModuleProduct], '$position': req.body.sequence } } }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Add Product to Module: Invalid Discriminator Provided'));
				else res.status(200).send(new ModuleResponse(200, 'Product Added to Module Successfully'));
			}, (error: Error & { code: number } | null) => {
				if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ModuleResponse(400, 'Cannot Add Product to Module: Invalid Discriminator Provided'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModuleProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.discriminator || !req.params.sequence || isNaN(parseInt(req.params.sequence))) res.status(400).send(new ModuleResponse(400, 'Cannot Delete Product from Module: Invalid Discriminator or Sequence Provided'));
		else {
			const key = `products.${parseInt(req.params.sequence) - 1}`;
			Module.updateOne({ discriminator: req.params.discriminator }, { '$unset': { [key]: 1 } }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Delete Product from Module: Invalid Discriminator Provided'));
				else if (docs.nModified === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Delete Product from Module: Invalid Sequence Provided'));
				else {
					Module.updateOne({ discriminator: req.params.discriminator }, { '$pull': { products: null } }).then((docs: { n: number, nModified: number }) => {
						if (docs.n === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Delete Product from Module: Invalid Discriminator Provided'));
						else if (docs.nModified === 0) res.status(400).send(new ModuleResponse(400, 'Cannot Delete Product from Module: Invalid Sequence Provided'));
						else res.status(200).send(new ModuleResponse(200, 'Product Deleted from Module Successfully'));
					}, (error: Error & { code: number } | null) => {
						if (error) generate500(req, res, error);
					});
				}
			}, (error: Error & { code: number } | null) => {
				if (error) generate500(req, res, error);
			});
		}
	} catch (error) {
		generate500(req, res, error);
	}
};