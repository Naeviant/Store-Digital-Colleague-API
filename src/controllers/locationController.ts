import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { Aisle, IAisle, Bay, IBay } from '../entities/Location';
import { respond, generate500 } from '../helpers/respond';

class AisleUpdate {
	name?: string;
	aisle?: number;
}

export const addAisle = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`${config.base}/aisle/${req.params.code}/${req.body.aisle}`).then(() => {
				respond(req, res, 409, 'Cannot Add Aisle: Aisle Number Already in Use');
			}).catch((error: Error & { response: { status: number } }) => {
				if (error.response.status === 404 || error.response.status === 400) {
					const newAisle = new Aisle({ name: req.body.name, aisle: req.body.aisle, site: site._id });
					newAisle.save().then(() => {
						respond(req, res, 201, 'Aisle Added Successfully');
					}, (error: Error & { name: string }) => {
						if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Add Aisle: Invalid Request Body');
						else generate500(req, res, error);
					});
				}
				else generate500(req, res, error);
			});			
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Add Aisle: Invalid Site Code Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAisle = async (req: Request & { params: { aisle: number } }, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			Aisle.findOne({ site: site._id, aisle: req.params.aisle }, { __v: 0 }).populate('site', '-__v').then((doc: IAisle | null) => {
				if (!doc) respond(req, res, 404, 'Cannot Get Aisle: Aisle Not Found');
				else respond(req, res, 200, 'Aisle Retrieved Successfully', doc);
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Get Aisle: Invalid Site Code Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAllAislesAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			Aisle.find({ site: site._id }, { _id: 0, __v: 0 }).populate('site', '-__v -_id').then((docs: IAisle[] | null) => {
				respond(req, res, 200, 'Aisles Retrieved Successfully', docs);
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Get Aisles: Invalid Site Code Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateAisle = async (req: Request & { params: { aisle: number } }, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/site/${req.params.code}`).then(async (response: AxiosResponse) => {
			const site = response.data.data;
			const update = new AisleUpdate();
			if (req.body.name) update.name = req.body.name;
			if (req.body.aisle) update.aisle = await axios.get(`${config.base}/aisle/${req.params.code}/${req.body.aisle}`).then((response: AxiosResponse) => { return response.data.data; }).catch(() => { return req.body.aisle; });
			if (Object.keys(update).length === 0) respond(req, res, 400, 'Cannot Update Aisle: Invalid Request Body');
			else if (req.body.aisle && typeof update.aisle !== 'number') respond(req, res, 409, 'Cannot Update Aisle: New Aisle Number Already in Use');
			else Aisle.updateOne({ site: site._id, aisle: req.params.aisle }, { '$set': update }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Cannot Update Aisle: Invalid Site Code or Aisle Number Provided');
				else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
				else respond(req, res, 200, 'Aisle Updated Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Get Aisle: Invalid Site Code Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteAisle = async (req: Request & { params: { aisle: number } }, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			Aisle.deleteOne({ site: site._id, aisle: req.params.aisle }).then((doc: { deletedCount: number }) => {
				if (doc.deletedCount === 0) respond(req, res, 400, 'Cannot Delete Aisle: Invalid Site Code or Aisle Number Provided');
				else respond(req, res, 200, 'Aisle Deleted Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Delete Aisle: Invalid Site Code Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

class BayUpdate {
	bay?: number;
	moduleLimit?: number;
	allowsMultiLocation?: boolean;
	allowsClearance?: boolean;
	allowsDisplay?: boolean;
	allowsOverstock?: boolean;
	allowsTopstock?: boolean;
	allowsStockroom?: boolean;
}

export const addBay = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/aisle/${req.params.code}/${req.params.aisle}`).then((response: AxiosResponse) => {
			const aisle = response.data.data;
			axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.body.bay}/`).then(() => {
				respond(req, res, 409, 'Cannot Add Bay: Bay Number Already in Use');
			}).catch((error: Error & { response: { status: number } }) => {
				if (error.response.status === 404 || error.response.status === 400) {
					req.body.aisle = aisle._id;
					const newBay = new Bay(req.body);
					newBay.save().then(() => {
						respond(req, res, 201, 'Bay Added Successfully');
					}, (error: Error & { name: string }) => {
						if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Add Bay: Invalid Request Body');
						else generate500(req, res, error);
					});
				}
				else generate500(req, res, error);
			});			
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Add Bay: Invalid Site Code or Aisle Number Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getBay = async (req: Request & { params: { bay: number } }, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/aisle/${req.params.code}/${req.params.aisle}`).then((response: AxiosResponse) => {
			const aisle = response.data.data;
			Bay.findOne({ aisle: aisle._id, bay: req.params.bay }, { __v: 0 }).populate({ path: 'aisle', select: '-__v', populate: { path: 'site', select: '-__v' } }).then((doc: IBay | null) => {
				if (!doc) respond(req, res, 404, 'Cannot Get Bay: Bay Not Found');
				else respond(req, res, 200, 'Bay Retrieved Successfully', doc);
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Get Bay: Invalid Site Code or Bay Number Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAllBaysInAisle = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/aisle/${req.params.code}/${req.params.aisle}`).then((response: AxiosResponse) => {
			const aisle = response.data.data;
			Bay.find({ aisle: aisle._id }, { _id: 0, __v: 0 }).populate({ path: 'aisle', select: '-__v -_id', populate: { path: 'site', select: '-__v -_id' } }).then((docs: IBay[] | null) => {
				respond(req, res, 200, 'Bays Retrieved Successfully', docs);
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Get Bays: Invalid Site Code or Aisle Number Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateBay = async (req: Request & { params: { bay: number } }, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/aisle/${req.params.code}/${req.params.aisle}`).then(async (response: AxiosResponse) => {
			const aisle = response.data.data;
			const update = new BayUpdate();
			if (req.body.moduleLimit) update.moduleLimit = req.body.moduleLimit;
			if (typeof req.body.allowsMultiLocation !== 'undefined') update.allowsMultiLocation = req.body.allowsMultiLocation;
			if (typeof req.body.allowsClearance !== 'undefined') update.allowsClearance = req.body.allowsClearance;
			if (typeof req.body.allowsDisplay !== 'undefined') update.allowsDisplay = req.body.allowsDisplay;
			if (typeof req.body.allowsOverstock !== 'undefined') update.allowsOverstock = req.body.allowsOverstock;
			if (typeof req.body.allowsTopstock !== 'undefined') update.allowsTopstock = req.body.allowsTopstock;
			if (typeof req.body.allowsStockroom !== 'undefined') update.allowsStockroom = req.body.allowsStockroom;
			if (req.body.bay) update.bay = await axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.body.bay}`).then((response: AxiosResponse) => { return response.data.data; }).catch(() => { return req.body.bay; });
			if (Object.keys(update).length === 0) respond(req, res, 400, 'Cannot Update Aisle: Invalid Request Body');
			else if (req.body.bay && typeof update.bay !== 'number') respond(req, res, 409, 'Cannot Update Bay: New Aisle Bay Already in Use');
			else Bay.updateOne({ aisle: aisle._id, bay: req.params.bay }, { '$set': update }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) respond(req, res, 400, 'Cannot Update Bay: Invalid Site Code, Aisle Number or Bay Number Provided');
				else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
				else respond(req, res, 200, 'Bay Updated Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Update Bay: Invalid Site Code or Bay Number Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteBay = async (req: Request & { params: { bay: number } }, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/aisle/${req.params.code}/${req.params.aisle}`).then((response: AxiosResponse) => {
			const aisle = response.data.data;
			Bay.deleteOne({ aisle: aisle._id, bay: req.params.bay }).then((doc: { deletedCount: number }) => {
				if (doc.deletedCount === 0) respond(req, res, 400, 'Cannot Delete Bay: Invalid Site Code, Aisle Number or Bay Number Provided');
				else respond(req, res, 200, 'Aisle Deleted Successfully');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Delete Bay: Invalid Site Code or Bay Number Provided');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};