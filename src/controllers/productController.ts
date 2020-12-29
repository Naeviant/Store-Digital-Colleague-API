import { Request, Response } from 'express';
import { Product, IProduct } from '../entities/Product';
import { respond, generate500 } from '../helpers/respond';

class ProductUpdate {
	name?: string;
	price?: number;
	status?: string;
}

export const addProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const newProduct = new Product(req.body);
		newProduct.save().then(() => {
			respond(req, res, 201, 'Product Added Successfully');
		}, (error: Error & { name: string, code: number }) => {
			if (error.code === 11000) respond(req, res, 409, 'Cannot Add Product: EAN Already in Use');
			else if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Add Product: Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		Product.findOne({ ean: req.params.ean }, { __v: 0 }).then((doc: IProduct | null) => {
			if (!doc) respond(req, res, 404, 'Cannot Get Product: Product Not Found');
			else respond(req, res, 200, 'Product Retrieved Successfully', doc);
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		Product.find({}, { _id: 0, __v: 0 }).then((docs: IProduct[] | null) => {
			respond(req, res, 200, 'Products Retrieved Successfully', docs);
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const update = new ProductUpdate();
		if (req.body.name) update.name = req.body.name;
		if (req.body.price) update.price = req.body.price;
		if (req.body.status) update.status = req.body.status;
		if (Object.keys(update).length === 0) respond(req, res, 400, 'Cannot Update Product: Invalid Request Body');
		else Product.updateOne({ ean: req.params.ean }, { '$set': update }, { runValidators: true }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) respond(req, res, 400, 'Cannot Update Product: Invalid EAN Provided');
			else if (docs.nModified === 0) respond(req, res, 200, 'No Changes Required');
			else respond(req, res, 200, 'Product Updated Successfully');
		}, (error: Error & { name: string }) => {
			if (error.name === 'ValidationError') respond(req, res, 400, 'Cannot Update Product: Invalid Request Body');
			else generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		Product.deleteOne({ ean: req.params.ean }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) respond(req, res, 400, 'Cannot Delete Product: Invalid EAN Provided');
			else respond(req, res, 200, 'Product Deleted Successfully');
		}, (error: Error) => {
			generate500(req, res, error);
		});
	} catch (error) {
		generate500(req, res, error);
	}
};
