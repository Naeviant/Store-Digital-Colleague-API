import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { ModuleInstance, IModuleInstance } from '../entities/ModuleInstance';
import { ModuleInstanceResponse  } from '../helpers/generateResponse';
import { generate500 } from '../helpers/httpErrors';

export const addModuleToSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.code || !req.body.discriminator) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Add Module to Site: Invalid Request Body')); 
		else axios.get(`${config.base}/site/${req.body.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/module/${req.body.discriminator}`).then((response: AxiosResponse) => {
				const module = response.data.data;
				const newModuleInstance = new ModuleInstance({ module: module._id, site: site._id, bay: null });
				ModuleInstance.findOne({ module: module._id, site: site._id }).then((doc: IModuleInstance | null) => {
					if (doc) res.status(409).send(new ModuleInstanceResponse(409, 'Cannot Add Module to Site: Module Already Exists at Site'));
					else newModuleInstance.save().then(() => {
						res.status(201).send(new ModuleInstanceResponse(201, 'Module Added to Site Successfully'));
					}, (error: Error & { code: number } | null) => {
						if (error) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Add Module to Site: Invalid Request Body'));
					});
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Add Module to Site: Invalid Discriminator Provided'));
				else if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Add Module to Site: Invalid Site Code Provided'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModulesAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Get Modules from Site: Invalid Site Code Provided')); 
		else axios.get(`${config.base}/site/${req.body.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			ModuleInstance.find({ site: site._id }, { _id: 0, __v: 0 })
				.populate({ path: 'site', select: '-_id -__v'})
				.populate({ path: 'module', select: '-_id -__v -products._id', populate: { path: 'products.product', model: 'Product', select: '-_id -__v' }})
				// TODO: POPULATE BAY
				.then((docs: IModuleInstance[] | null) => {
				res.status(200).send(new ModuleInstanceResponse(200, 'Modules at Site Retrieved Successfully', docs));
			}, (error: Error & { code: number } | null) => {
				if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Get Modules from Site: Invalid Site Code Provided'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModuleFromSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.discriminator) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Delete Module from Site: Invalid Site Code of Discriminator Body')); 
		else axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/module/${req.params.discriminator}`).then((response: AxiosResponse) => {
				const module = response.data.data;
				ModuleInstance.deleteOne({ module: module._id, site: site._id }).then((doc: { deletedCount: number }) => {
					if (doc.deletedCount === 0) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Delete Module from Site: Module Not at Site'));
					else res.status(200).send(new ModuleInstanceResponse(200, 'Module Deleted from Site Successfully'));
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Delete Module from Site: Invalid Discriminator Provided'));
				else if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new ModuleInstanceResponse(400, 'Cannot Delete Module from Site: Invalid Site Code Provided'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};
