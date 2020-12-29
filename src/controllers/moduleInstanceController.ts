import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { ModuleInstance, IModuleInstance } from '../entities/ModuleInstance';
import { respond } from '../helpers/respond';
import { generate500 } from '../helpers/httpErrors';

export const addModuleToSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.code || !req.body.discriminator) respond(req, res, 400, 'Cannot Add Module to Site: Invalid Request Body'); 
		else axios.get(`${config.base}/site/${req.body.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/module/${req.body.discriminator}`).then((response: AxiosResponse) => {
				const module = response.data.data;
				const newModuleInstance = new ModuleInstance({ module: module._id, site: site._id, bay: null });
				ModuleInstance.findOne({ module: module._id, site: site._id }).then((doc: IModuleInstance | null) => {
					if (doc) respond(req, res, 409, 'Cannot Add Module to Site: Module Already Exists at Site');
					else newModuleInstance.save().then(() => {
						respond(req, res, 201, 'Module Added to Site Successfully');
					}, (error: Error & { code: number } | null) => {
						if (error) respond(req, res, 400, 'Cannot Add Module to Site: Invalid Request Body');
					});
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Add Module to Site: Invalid Discriminator Provided');
				else if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Add Module to Site: Invalid Site Code Provided');
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModuleAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.discriminator) respond(req, res, 400, 'Cannot Get Module at Site: Invalid Site Code or Discriminator'); 
		else axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/module/${req.params.discriminator}`).then((response: AxiosResponse) => {
				const module = response.data.data;
				ModuleInstance.findOne({ module: module._id, site: site._id }, { __v: 0 })
					.populate({ path: 'site', select: '-__v'})
					.populate({ path: 'module', select: '-__v', populate: { path: 'products.product', model: 'Product', select: '-__v' }})
					.populate({ path: 'bay', select: '-__v', populate: { path: 'aisle', select: '-__v', populate: { path: 'site', select: '-__v' } } })
					.then((doc: IModuleInstance | null) => {
						if (!doc) respond(req, res, 404, 'Cannot Get Module at Site: Module Not at Site');
						else respond(req, res, 200, 'Module at Site Retrieved Successfully', doc);
					}, (error: Error & { code: number } | null) => {
						if (error) generate500(req, res, error);
					});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Add Module to Site: Invalid Discriminator Provided');
				else if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Add Module to Site: Invalid Site Code Provided');
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModulesAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code) respond(req, res, 400, 'Cannot Get Modules from Site: Invalid Site Code Provided'); 
		else axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			ModuleInstance.find({ site: site._id }, { _id: 0, __v: 0 })
				.populate({ path: 'site', select: '-_id -__v'})
				.populate({ path: 'module', select: '-_id -__v -products._id', populate: { path: 'products.product', model: 'Product', select: '-_id -__v' }})
				.populate({ path: 'bay', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } })
				.then((docs: IModuleInstance[] | null) => {
					respond(req, res, 200, 'Modules at Site Retrieved Successfully', docs);
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Get Modules from Site: Invalid Site Code Provided');
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteModuleFromSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.discriminator) respond(req, res, 400, 'Cannot Delete Module from Site: Invalid Site Code of Discriminator Body'); 
		else axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/module/${req.params.discriminator}`).then((response: AxiosResponse) => {
				const module = response.data.data;
				ModuleInstance.deleteOne({ module: module._id, site: site._id }).then((doc: { deletedCount: number }) => {
					if (doc.deletedCount === 0) respond(req, res, 404, 'Cannot Delete Module from Site: Module Not at Site');
					else respond(req, res, 200, 'Module Deleted from Site Successfully');
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Delete Module from Site: Invalid Discriminator Provided');
				else if (error) generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Delete Module from Site: Invalid Site Code Provided');
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const addModuleToBay = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.aisle || !req.params.bay) respond(req, res, 400, 'Cannot Assign Module: Invalid Site Code, Aisle Number or Bay Number Provided');
		else if (!req.body.discriminator) respond(req, res, 400, 'Cannot Assign Module: Invalid Discriminator');
		else axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
			const bay = response.data.data;
			axios.get(`${config.base}/module/${req.body.discriminator}`).then((response: AxiosResponse) => {
				const module = response.data.data;
				axios.get(`${config.base}/module/site/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
					const bayModules = response.data.data;
					if (bayModules.length >= bay.moduleLimit) respond(req, res, 400, 'Cannot Assign Module: Bay is Full');
					else ModuleInstance.updateOne({ site: bay.aisle.site._id, module: module._id }, { '$set': { bay: bay._id } }).then((docs: { n: number, nModified: number }) => {
						if (docs.n === 0) respond(req, res, 400, 'Cannot Assign Module: Invalid Site Code, Aisle Number, Bay Number or Discriminator Provided');
						else respond(req, res, 200, 'Module Assigned Successfully');
					}, (error: Error & { code: number } | null) => {
						if (error) generate500(req, res, error);
					});
				}).catch((error: Error & { response: { status: number } } | null) => {
					if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Assign Module: Invalid Site Code, Aisle Number or Bay Number Provided');
					else if (error) generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Assign Module: Invalid Discriminator Provided');
				else if (error) generate500(req, res, error);
			}); 
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Assign Module: Invalid Site Code, Aisle Number or Bay Number Provided');
			else if (error) generate500(req, res, error);
		}); 
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getModulesInBay = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.aisle || !req.params.bay) respond(req, res, 400, 'Cannot Get Modules in Bay: Invalid Site Code, Aisle Number or Bay Number Provided');
		else axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
			const bay = response.data.data;
			ModuleInstance.find({ bay: bay._id }, { _id: 0, __v: 0 })
				.populate({ path: 'site', select: '-_id -__v'})
				.populate({ path: 'module', select: '-_id -__v -products._id', populate: { path: 'products.product', model: 'Product', select: '-_id -__v' }})
				.populate({ path: 'bay', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } })
				.then((docs: IModuleInstance[] | null) => {
					respond(req, res, 200, 'Modules in Bay Retrieved Successfully', docs);
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Assign Module: Invalid Site Code, Aisle Number or Bay Number Provided');
			else if (error) generate500(req, res, error);
		}); 
	} catch (error) {
		generate500(req, res, error);
	}
};


export const deleteModuleFromBay = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.aisle || !req.params.bay) respond(req, res, 400, 'Cannot Unassign Module: Invalid Site Code, Aisle Number or Bay Number Provided');
		else if (!req.params.discriminator) respond(req, res, 400, 'Cannot Unassign Module: Invalid Discriminator');
		else axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/module/${req.params.discriminator}`).then((response: AxiosResponse) => {
				const module = response.data.data;
				ModuleInstance.updateOne({ site: site._id, module: module._id }, { '$set': { bay: null } }).then((docs: { n: number, nModified: number }) => {
					if (docs.n === 0) respond(req, res, 400, 'Cannot Unassign Module: Invalid Site Code or Discriminator Provided');
					else if (docs.nModified === 0) respond(req, res, 404, 'Cannot Unassign Module: Module Not Assigned to Bay');
					else respond(req, res, 200, 'Module Unassigned Successfully');
				}, (error: Error & { code: number } | null) => {
					if (error) generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Unassign Module: Invalid Discriminator Provided');
				else if (error) generate500(req, res, error);
			}); 
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) respond(req, res, 400, 'Cannot Unassign Module: Invalid Site Code ');
			else if (error) generate500(req, res, error);
		}); 
	} catch (error) {
		generate500(req, res, error);
	}
};