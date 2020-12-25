import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { Site, ISite, Aisle, IAisle } from '../entities/Location';
import { SiteResponse, AisleResponse } from '../helpers/generateResponse';

class SiteUpdate {
	name?: string;
}

export const addSite = async (req: Request, res: Response): Promise<void> => {
	try {
		const newSite = new Site(req.body);
		newSite.save().then(() => {
			res.status(201).send(new SiteResponse(201, 'Site Added Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error && error.code === 11000) res.status(400).send(new SiteResponse(400, 'Cannot Add Site: Site Code Already in Use'));
			else if (error) res.status(400).send(new SiteResponse(400, 'Cannot Add Site: Invalid Request Body'));
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};

export const getSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code) res.status(400).send(new SiteResponse(404, 'Invalid Site Code Provided'));
		Site.findOne({ code: req.params.code }, { __v: 0 }).then((doc: ISite | null) => {
			if (!doc) res.status(400).send(new SiteResponse(404, 'Site Not Found'));
			else res.status(200).send(new SiteResponse(200, 'Site Retrieved Successfully', doc));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};

export const getAllSites = async (req: Request, res: Response): Promise<void> => {
	try {
		Site.find({}, { _id: 0, __v: 0 }).then((docs: ISite[] | null) => {
			res.status(200).send(new SiteResponse(200, 'Sites Retrieved Successfully', docs));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};

export const updateSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code) res.status(400).send(new SiteResponse(404, 'Invalid Site Code Provided'));
		const update = new SiteUpdate();
		if (req.body.name) update.name = req.body.name;
		Site.updateOne({ code: req.params.code }, { '$set': update }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) res.status(400).send(new SiteResponse(400, 'Invalid Site Code Provided'));
			else if (docs.nModified === 0) res.status(200).send(new SiteResponse(200, 'No Changes Required'));
			else res.status(200).send(new SiteResponse(200, 'Site Updated Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};

export const deleteSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code) res.status(400).send(new SiteResponse(404, 'Invalid Site Code Provided'));
		Site.deleteOne({ code: req.params.code }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) res.status(400).send(new SiteResponse(400, 'Invalid Site Code Provided'));
			else res.status(200).send(new SiteResponse(200, 'Site Deleted Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};

class AisleUpdate {
	aisle?: number;
}

export const addAisle = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.body.aisle) res.status(400).send(new AisleResponse(400, 'Cannot Add Aisle: Invalid Request Body'));
		else axios.get(`http://localhost:8000/api/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			axios.get(`http://localhost:8000/api/aisle/${req.params.code}/${req.body.aisle}`).then((response: AxiosResponse) => {
				if (response.data.data) res.status(400).send(new AisleResponse(400, 'Aisle Number Already in Use'));
			}).catch((error: Error & { response: { status: number } } | null) => {
				if (error && error.response && error.response.status === 400) {
					const newAisle = new Aisle({ aisle: req.body.aisle, site: site._id });
					newAisle.save().then(() => {
						res.status(201).send(new AisleResponse(201, 'Aisle Added Successfully'));
					}, (error: Error & { code: number } | null) => {
						if (error) res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
					});
				}
				else if (error) res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
			});			
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && error.response.status === 400) res.status(400).send(new AisleResponse(400, 'Invalid Site Code Provided'));
			else res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
	}
};

export const getAisle = async (req: Request & { params: { aisle: number } }, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.aisle) res.status(400).send(new SiteResponse(404, 'Invalid Site Code or Aisle Number Provided'));
		else axios.get(`http://localhost:8000/api/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			Aisle.findOne({ site: site._id, aisle: req.params.aisle }, { __v: 0 }).populate('site', '-__v').then((doc: IAisle | null) => {
				if (!doc) res.status(400).send(new AisleResponse(404, 'Aisle Not Found'));
				else res.status(200).send(new AisleResponse(200, 'Aisle Retrieved Successfully', doc));
			}, (error: Error & { code: number } | null) => {
				if (error) res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
			});
		});
	} catch (error) {
		res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
	}
};

export const getAllAislesAtSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code) res.status(400).send(new AisleResponse(400, 'Cannot Add Aisle: Invalid Site Code Provided'));
		else axios.get(`http://localhost:8000/api/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			Aisle.find({ site: site._id }, { _id: 0, __v: 0 }).populate('site', '-__v -_id').then((docs: IAisle[] | null) => {
				res.status(200).send(new AisleResponse(200, 'Aisles Retrieved Successfully', docs));
			}, (error: Error & { code: number } | null) => {
				if (error) res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && error.response.status === 400) res.status(400).send(new AisleResponse(400, 'Invalid Site Code Provided'));
			else res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
	}
};

export const updateAisle = async (req: Request & { params: { aisle: number } }, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.aisle) res.status(400).send(new SiteResponse(404, 'Invalid Site Code or Aisle Number Provided'));
		else axios.get(`http://localhost:8000/api/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			const update = new AisleUpdate();
			if (req.body.aisle) update.aisle = req.body.aisle;
			Aisle.updateOne({ site: site._id, aisle: req.params.aisle }, { '$set': update }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) res.status(400).send(new AisleResponse(400, 'Invalid Site Code or Aisle Number Provided'));
				else if (docs.nModified === 0) res.status(200).send(new AisleResponse(200, 'No Changes Required'));
				else res.status(200).send(new AisleResponse(200, 'Aisle Updated Successfully'));
			}, (error: Error & { code: number } | null) => {
				if (error) res.status(500).send(new AisleResponse(500, 'Something Went Wrong'));
			});
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};

export const deleteAisle = async (req: Request & { params: { aisle: number } }, res: Response): Promise<void> => {
	try {
		if (!req.params.code || !req.params.aisle) res.status(400).send(new SiteResponse(404, 'Invalid Site Code or Aisle Number Provided'));
		else axios.get(`http://localhost:8000/api/site/${req.params.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			Aisle.deleteOne({ site: site._id, aisle: req.params.aisle }).then((doc: { deletedCount: number }) => {
				if (doc.deletedCount === 0) res.status(400).send(new SiteResponse(400, 'Invalid Site Code or Aisle Number Provided'));
				else res.status(200).send(new SiteResponse(200, 'Aisle Deleted Successfully'));
			}, (error: Error & { code: number } | null) => {
				if (error) res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
			});
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};