import { Request, Response } from 'express';
import { Assignment, IAssignment } from '../entities/Assignment';
import { respond, generate500 } from '../helpers/respond';

export const addAssignment = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.ean || !req.body.type) respond(req, res, 400, 'Invalid Request Body');
		else if (Array.isArray(res.locals.bay)) respond(req, res, 400, 'Invalid Site Code, Aisle Number or Bay Number');
		else if (
			(!res.locals.bay.allowsMultiLocation && req.body.type === 'Multi-Location') ||
			(!res.locals.bay.allowsClearance && req.body.type === 'Clearance') ||
			(!res.locals.bay.allowsDisplay && req.body.type === 'Display') ||
			(!res.locals.bay.allowsOverstock && req.body.type === 'Overstock') ||
			(!res.locals.bay.allowsTopstock && req.body.type === 'Topstock') ||
			(!res.locals.bay.allowsStockroom && req.body.type == 'Stockroom')	
		) respond(req, res, 422, 'Location Does Not Accept Assignment Type');
		else {
			const newAssignment = new Assignment({ bay: res.locals.bay._id, product: res.locals.product._id, type: req.body.type });
			newAssignment.save().then(() => {
				respond(req, res, 201, 'Assignment Added Successfully');
			}, (error: Error & { name: string }) => {
				if (error.name === 'ValidationError') respond(req, res, 400, 'Invalid Request Body');
				else generate500(req, res, error);
			});
		}
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAssignmentsByLocation = async (req: Request, res: Response): Promise<void> => {
	try {
		if (['Multi-Location', 'Display', 'Clearance', 'Topstock', 'Overstock', 'Stockroom'].indexOf(req.params.type) === -1) respond(req, res, 400, 'Invalid Location Type Provided');
		else Assignment.find({ bay: res.locals.bay._id, type: req.params.type }, { _id: 0, __v: 0 }).populate({ path: 'bay product', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } }).then((docs: IAssignment[] | null) => {
			if (docs) respond(req, res, 200, 'Assignments Retrieved Successfully', docs);
			else respond(req, res, 404, 'No Assignments Found');
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAssignmentsByProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		Assignment.find({ product: res.locals.product._id }, { _id: 0, __v: 0 }).populate({ path: 'bay product', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v', match: { _id: res.locals.site._id } } } }).then((docs: IAssignment[] | null) => {
			if (docs) respond(req, res, 200, 'Assignments Retrieved Successfully', docs.filter(x => x.bay.aisle.site.code == req.params.code));
			else respond(req, res, 404, 'Cannot Get Assignments: No Assignments Found');
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
	try {
		const doc = await Assignment.findOne({ bay: res.locals.bay._id, product: res.locals.product._id, type: req.params.type });
		if (doc) {
			await doc.remove();
			respond(req, res, 200, 'Assignment Deleted Successfully');
		}
		else respond(req, res, 400, 'Cannot Unassign Product: Invalid Site Code, Aisle Number, Bay Number, Assignment Type or EAN Provided');
	} catch (error) {
		generate500(req, res, error);
	}
};
