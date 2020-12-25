import { Request, Response } from 'express';
import { Site, ISite } from '../entities/Site';
import { SiteResponse  } from '../helpers/generateResponse';

class SiteUpdate {
	name?: string;
}

export const addSite = async (req: Request, res: Response): Promise<void> => {
	try {
		const newSite = new Site(req.body);
		newSite.save().then(() => {
			res.status(201).send(new SiteResponse(201, 'Site Added Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error && error.code === 11000) res.status(409).send(new SiteResponse(409, 'Cannot Add Site: Site Code Already in Use'));
			else if (error) res.status(400).send(new SiteResponse(400, 'Cannot Add Site: Invalid Request Body'));
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};

export const getSite = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.code) res.status(400).send(new SiteResponse(400, 'Cannot Get Site: Invalid Site Code Provided'));
		Site.findOne({ code: req.params.code }, { __v: 0 }).then((doc: ISite | null) => {
			if (!doc) res.status(404).send(new SiteResponse(404, 'Cannot Get Site: Site Code Not Found'));
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
		if (!req.params.code) res.status(400).send(new SiteResponse(400, 'Cannot Update Site: Invalid Site Code Provided'));
		const update = new SiteUpdate();
		if (req.body.name) update.name = req.body.name;
		Site.updateOne({ code: req.params.code }, { '$set': update }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) res.status(400).send(new SiteResponse(400, 'Cannot Update Site: Site Code Not Found'));
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
		if (!req.params.code) res.status(400).send(new SiteResponse(400, 'Cannot Delete Site: Invalid Site Code Provided'));
		Site.deleteOne({ code: req.params.code }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) res.status(400).send(new SiteResponse(400, 'Cannot Delete Site: Invalid Site Code Provided'));
			else res.status(200).send(new SiteResponse(200, 'Site Deleted Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new SiteResponse(500, 'Something Went Wrong'));
	}
};