import { Request, Response } from 'express';
import { Site, ISite } from '../entities/Site';
import { respond, generate500 } from '../helpers/respond';

class SiteUpdate {
	name?: string;
}

export const addSite = async (req: Request, res: Response): Promise<void> => {
	try {
		const newSite = new Site(req.body);
		newSite.save().then(() => {
			respond(req, res, 201, 'Site Added Successfully');
		}, (error: Error & { name: string, code: number }) => {
			if (error.code === 11000) respond(req, res, 409, 'Cannot Add Site: Site Code Already in Use');
			else if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Add Site: Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getSite = async (req: Request, res: Response): Promise<void> => {
	try {
		Site.findOne({ code: req.params.code }, { __v: 0 }).then((doc: ISite | null) => {
			if (!doc) respond(req, res, 404, 'Cannot Get Site: Site Code Not Found');
			else respond(req, res, 200, 'Site Retrieved Successfully', doc);
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAllSites = async (req: Request, res: Response): Promise<void> => {
	try {
		Site.find({}, { _id: 0, __v: 0 }).then((docs: ISite[] | null) => {
			respond(req, res, 200, 'Sites Retrieved Successfully', docs);
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateSite = async (req: Request, res: Response): Promise<void> => {
	try {
		const update = new SiteUpdate();
		if (req.body.name) update.name = req.body.name;
		if (Object.keys(update).length === 0) respond(req, res, 400, 'Cannot Update Site: Invalid Request Body');
		else Site.updateOne({ code: req.params.code }, { '$set': update }, { runValidators: true }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Cannot Update Site: Invalid Site Code Provided');
			else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
			else respond(req, res, 200, 'Site Updated Successfully');
		}, (error: Error & { name: string }) => {
			if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Update Site: Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteSite = async (req: Request, res: Response): Promise<void> => {
	try {
		Site.deleteOne({ code: req.params.code }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) respond(req, res, 400, 'Cannot Delete Site: Invalid Site Code Provided');
			else respond(req, res, 200, 'Site Deleted Successfully');
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};