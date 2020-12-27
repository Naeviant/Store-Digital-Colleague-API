import { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { config } from '../helpers/config';
import { User, IUser } from '../entities/User';
import { UserResponse, AuthResponse } from '../helpers/generateResponse';
import { generate500 } from '../helpers/httpErrors';

class UserUpdate {
	firstName?: string;
	lastName?: string;
	username?: string;
	password?: string;
	userType?: string;
	site?: number;
}

export const addUser = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.body.code) res.status(400).send(new UserResponse(400, 'Cannot Add User: Invalid Request Body'));
		else axios.get(`${config.base}/site/${req.body.code}`).then((response: AxiosResponse) => {
			const site = response.data.data;
			req.body.site = site._id;
			hash(req.body.password, 10, (error: Error, hashedPassword: string) => {
				req.body.password = hashedPassword;
				const newUser = new User(req.body);
				newUser.save().then(() => {
					res.status(201).send(new UserResponse(201, 'User Added Successfully'));
				}, (error: Error & { code: number } | null) => {
					if (error && error.code === 11000) res.status(409).send(new UserResponse(409, 'Cannot Add Product: Username Already in Use'));
					else if (error) res.status(400).send(new UserResponse(400, 'Cannot Add User: Invalid Request Body'));
				});
			});
		}).catch((error: Error & { response: { status: number } } | null) => {
			if (error && error.response && (error.response.status === 404 || error.response.status === 400)) res.status(400).send(new UserResponse(400, 'Cannot Add User: Invalid Site Code Provided'));
			else if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.username) res.status(400).send(new UserResponse(400, 'Cannot Get User: Invalid Username Provided'));
		else User.findOne({ username: req.params.username }, { __v: 0 }).populate('site', '-__v').then((doc: IUser | null) => {
			if (!doc) res.status(404).send(new UserResponse(404, 'Cannot Get User: User Not Found'));
			else res.status(200).send(new UserResponse(200, 'User Retrieved Successfully', doc));
		}, (error: Error & { code: number } | null) => {
			if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.username) res.status(400).send(new UserResponse(400, 'Cannot Update User: Invalid Username Provided'));
		else {
			const update = new UserUpdate();
			let site, username;
			if (req.body.firstName) update.firstName = req.body.firstName;
			if (req.body.lastName) update.lastName = req.body.lastName;
			if (req.body.userType) update.userType = req.body.userType;
			if (req.body.password) update.password = await hash(req.body.password, 10);
			if (req.body.code) site = await axios.get(`${config.base}/site/${req.body.code}`).then((response: AxiosResponse) => { return response.data.data; }).catch(() => { return []; });
			if (req.body.username) username = await axios.get(`${config.base}/user/${req.body.username}`).then((response: AxiosResponse) => { return response.data.data; }).catch(() => { return []; });
			if (site && site._id) update.site = site._id;
			if (username && !username.username) update.username = req.body.username;
			if (typeof update.site !== 'string') res.status(400).send(new UserResponse(400, 'Cannot Update User: Invalid Site Code Provided'));
			else if (typeof update.username !== 'string') res.status(409).send(new UserResponse(409, 'Cannot Update User: New Username Already in Use'));
			else User.updateOne({ username: req.params.username }, { '$set': update }).then((docs: { n: number, nModified: number }) => {
				if (docs.n === 0) res.status(400).send(new UserResponse(400, 'Cannot Update User: Invalid Username Provided'));
				else if (docs.nModified === 0) res.status(200).send(new UserResponse(200, 'No Changes Required'));
				else res.status(200).send(new UserResponse(200, 'User Updated Successfully'));
			}, (error: Error & { code: number } | null) => {
				if (error) generate500(req, res, error);
			});
		}
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.username) res.status(400).send(new UserResponse(400, 'Cannot Delete User: Invalid Username Provided'));
		else User.deleteOne({ username: req.params.username }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) res.status(400).send(new UserResponse(400, 'Cannot Delete User: Invalid Username Provided'));
			else res.status(200).send(new UserResponse(200, 'User Deleted Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error) generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const authenticate = async (req: Request, res: Response): Promise<void> => {
	try {
		User.findOne({ username: req.body.username }, { __v: 0 }).populate('site', '-__v').then((doc: IUser | null) => {
			if (!doc) res.status(404).send(new AuthResponse(401, 'Invalid Credentials Provided'));
			else {
				compare(req.body.password, doc.password, (error: Error, valid: boolean) => {
					if (!valid) res.status(404).send(new AuthResponse(401, 'Invalid Credentials Provided'));
					else {
						const payload = doc.toObject();
						payload.password = '';
						const token = sign(payload, config.jwtSecret);
						res.status(200).send(new AuthResponse(200, 'Authentication Successful', token));
					}
				});
			}
		}, (error: Error & { code: number } | null) => {
			if (error) generate500(req, res, error);
		});
	}
	catch (error) {
		generate500(req, res, error);
	}
};