import { Request, Response } from 'express';
import { config } from '../helpers/config';
import axios, { AxiosResponse } from 'axios';
import { Assignment, IAssignment } from '../entities/Assignment';
import { respond, generate500 } from '../helpers/respond';

export const addAssignment = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.ean || !req.body.type) respond(req, res, 400, 'Cannot Assign Product: Invalid Request Body');
		else axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
			const bay = response.data.data;
			if (
				(!bay.allowsMultiLocation && req.body.type === 'Multi-Location') ||
				(!bay.allowsClearance && req.body.type === 'Clearance') ||
				(!bay.allowsDisplay && req.body.type === 'Display') ||
				(!bay.allowsOverstock && req.body.type === 'Overstock') ||
				(!bay.allowsTopstock && req.body.type === 'Topstock') ||
				(!bay.allowsStockroom && req.body.type == 'Stockroom')	
			) respond(req, res, 422, 'Cannot Assign Product: Location Does Not Accept Assignment Type');
			else axios.get(`${config.base}/product/${req.body.ean}`).then((response: AxiosResponse) => {
				const product = response.data.data;
				const newAssignment = new Assignment({ bay: bay._id, product: product._id, type: req.body.type });
				newAssignment.save().then(() => {
					respond(req, res, 201, 'Assignment Added Successfully');
				}, (error: Error & { name: string }) => {
					if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Assign Product: Invalid Request Body');
					else generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } }) => {
				if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Assign Product: Invalid EAN Provided');
				else generate500(req, res, error);
			}); 
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Assign Product: Invalid Site Code, Aisle Number or Bay Number Provided');
			else generate500(req, res, error);
		}); 
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAssignmentsByLocation = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
			const bay = response.data.data;
			Assignment.find({ bay: bay._id, type: req.params.type }, { _id: 0, __v: 0 }).populate({ path: 'bay product', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } }).then((docs: IAssignment[] | null) => {
				if (docs) respond(req, res, 200, 'Assignments Retrieved Successfully', docs);
				else respond(req, res, 404, 'Cannot Get Assignments: No Assignments Found');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Assign Product: Invalid Site Code, Aisle Number or Bay Number Provided');
			else generate500(req, res, error);
		}); 
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAssignmentsByProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/product/${req.params.ean}`).then((response: AxiosResponse) => {
			const product = response.data.data;
			Assignment.find({ product: product._id }, { _id: 0, __v: 0 }).populate({ path: 'bay product', select: '-_id -__v', populate: { path: 'aisle', select: '-_id -__v', populate: { path: 'site', select: '-_id -__v' } } }).then((docs: IAssignment[] | null) => {
				if (docs) respond(req, res, 200, 'Assignments Retrieved Successfully', docs.filter(x => x.bay.aisle.site.code == req.params.code));
				else respond(req, res, 404, 'Cannot Get Assignments: No Assignments Found');
			}, (error: Error) => {
				generate500(req, res, error);
			});
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Get Assignments: Invalid EAN Provided');
			else generate500(req, res, error);
		}); 
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
	try {
		axios.get(`${config.base}/bay/${req.params.code}/${req.params.aisle}/${req.params.bay}`).then((response: AxiosResponse) => {
			const bay = response.data.data;
			axios.get(`${config.base}/product/${req.params.ean}`).then((response: AxiosResponse) => {
				const product = response.data.data;
				Assignment.deleteOne({ bay: bay._id, product: product._id, type: req.params.type }).then((doc: { deletedCount: number }) => {
					if (doc.deletedCount === 0) respond(req, res, 400, 'Cannot Unassign Product: Invalid Site Code, Aisle Number, Bay Number, Assignment Type or EAN Provided');
					else respond(req, res, 200, 'Assignment Deleted Successfully');
				}, (error: Error) => {
					generate500(req, res, error);
				});
			}).catch((error: Error & { response: { status: number } }) => {
				if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Unassign Product: Invalid EAN Provided');
				else generate500(req, res, error);
			}); 
		}).catch((error: Error & { response: { status: number } }) => {
			if (error.response.status === 404 || error.response.status === 400) respond(req, res, 400, 'Cannot Unassign Product: Invalid Site Code, Aisle Number or Bay Number Provided');
			else generate500(req, res, error);
		}); 
	} catch (error) {
		generate500(req, res, error);
	}
};
