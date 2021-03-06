import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { ModuleInstance, IModuleInstance } from '../entities/ModuleInstance';
import { respond, generate500 } from '../helpers/respond';

export const addModuleToSite = async (req: Request, res: Response): Promise<void> => {
	try {
		const newModuleInstance = new ModuleInstance({ module: res.locals.module._id, site: res.locals.site._id, bay: null });
		ModuleInstance.findOne({ module: res.locals.module._id, site: res.locals.site._id }).then((doc: IModuleInstance | null) => {
			if (doc) respond(req, res, 409, 'Module Already Exists at Site');
			else newModuleInstance.save().then(() => {
				respond(req, res, 201, 'Module Added to Site Successfully');
			}, (error: Error & { name: string }) => {
				if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
				else generate500(req, res, error);
			});
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModuleAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		ModuleInstance.findOne({ module: res.locals.module._id, site: res.locals.site._id }, { __v: 0 })
			.populate({ path: 'site', select: '-__v'})
			.populate({ path: 'module', select: '-__v', populate: { path: 'products.product', model: 'Product', select: '-__v' }})
			.populate({ path: 'bay', select: '-__v', populate: { path: 'aisle', select: '-__v', populate: { path: 'site', select: '-__v' } } })
			.then((doc: IModuleInstance | null) => {
				if (!doc) respond(req, res, 404, 'Module Not at Site');
				else respond(req, res, 200, 'Module at Site Retrieved Successfully', doc);
			}, (error: Error) => {
				generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModulesAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		ModuleInstance.find({ site: res.locals.site._id }, { _id: 0, __v: 0 })
			.populate({ path: 'site', select: '-_id -__v'})
			.populate({ path: 'module', select: '-_id -__v -products._id', populate: { path: 'products.product', model: 'Product', select: '-_id -__v' }})
			.populate({ path: 'bay', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } })
			.then((docs: IModuleInstance[] | null) => {
				respond(req, res, 200, 'Modules at Site Retrieved Successfully', docs);
			}, (error: Error) => {
				generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModuleFromSite = async (req: Request, res: Response): Promise<void> => {
	try {
		const doc = await ModuleInstance.findOne({ module: res.locals.module._id, site: res.locals.site._id });
		if (doc) {
			await doc.remove();
			respond(req, res, 200, 'Module Deleted from Site Successfully');
		}
		else respond(req, res, 404, 'Module Not at Site');
	} catch (error) {
		generate500(req, res, error);
	}
};

export const addModuleToBay = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/module/site/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
			const bayModules = response.data.data;
			if (bayModules.length >= res.locals.bay.moduleLimit) respond(req, res, 400, 'Bay is Full');
			else ModuleInstance.updateOne({ site: res.locals.bay.aisle.site._id, module: res.locals.module._id }, { '$set': { bay: res.locals.bay._id } }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Invalid Site Code, Aisle Number, Bay Number or Module Discriminator Provided');
				else respond(req, res, 200, 'Module Assigned Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModulesInBay = async (req: Request, res: Response): Promise<void> => {
	try {
		ModuleInstance.find({ bay: res.locals.bay._id }, { _id: 0, __v: 0 })
			.populate({ path: 'site', select: '-_id -__v'})
			.populate({ path: 'module', select: '-_id -__v -products._id', populate: { path: 'products.product', model: 'Product', select: '-_id -__v' }})
			.populate({ path: 'bay', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } })
			.then((docs: IModuleInstance[] | null) => {
				respond(req, res, 200, 'Modules in Bay Retrieved Successfully', docs);
			}, (error: Error) => {
				generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModuleFromBay = async (req: Request, res: Response): Promise<void> => {
	try {
		ModuleInstance.updateOne({ site: res.locals.site._id, module: res.locals.module._id }, { '$set': { bay: null } }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Invalid Site Code or Module Discriminator Provided');
			else if (docs.nModified === 0) respond(req, res, 404, 'Module Not Assigned to Bay');
			else respond(req, res, 200, 'Module Unassigned Successfully');
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getProductModulesAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		ModuleInstance.find({ site: res.locals.site._id }, { _id: 0, __v: 0 })
			.populate({ path: 'site', select: '-_id -__v'})
			.populate({ path: 'module', select: '-_id -__v -products._id', populate: { path: 'products.product', model: 'Product', select: '-_id -__v' }})
			.populate({ path: 'bay', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } })
			.then((docs: IModuleInstance[] | null) => {
				docs = (docs ?? []).filter(x => { return x.module.products.map((y: & { product: { ean: string } }) => { return y.product.ean; } ).indexOf(req.params.ean) > -1; });
				respond(req, res, 200, 'Product Modules Retrieved Successfully', docs);
			}, (error: Error) => {
				generate500(req, res, error);
			});
	} catch (error) {
		generate500(req, res, error);
	}
};