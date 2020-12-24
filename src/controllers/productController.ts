import { Request, Response } from 'express';
import { Product, IProduct } from '../entities/Product';
import { ProductResponse } from '../helpers/generateResponse';

class Update {
	name?: string;
	price?: number;
}

export const addProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		const newProduct = new Product(req.body);
		newProduct.save().then(() => {
			res.status(201).send(new ProductResponse(201, 'Product Added Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error && error.code === 11000) res.status(400).send(new ProductResponse(400, 'Cannot Add Product: EAN Already in Use'));
			else if (error) res.status(400).send(new ProductResponse(400, 'Cannot Add Product: Invalid Request Body'));
		});
	} catch (error) {
		res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const getProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.ean) res.status(400).send(new ProductResponse(404, 'Product Not Found'));
		Product.findOne({ ean: req.params.ean }, { _id: 0, __v: 0 }).then((doc: IProduct | null) => {
			if (!doc) res.status(400).send(new ProductResponse(404, 'Product Not Found'));
			else res.status(200).send(new ProductResponse(200, 'Product Retrieved Successfully', doc));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
	try {
		Product.find({}, { _id: 0, __v: 0 }).then((docs: IProduct[] | null) => {
			res.status(200).send(new ProductResponse(200, 'Products Retrieved Successfully', docs));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.ean) res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
		const update = new Update();
		if (req.body.name) update.name = req.body.name;
		if (req.body.price) update.price = req.body.price;
		if (Object.keys(update).length === 0) res.status(400).send(new ProductResponse(400, 'Invalid Request Body'));
		Product.updateOne({ ean: req.params.ean }, { '$set': update }).then((docs: { n: number, nModified: number }) => {
			if (docs.n === 0) res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
			else if (docs.nModified === 0) res.status(200).send(new ProductResponse(200, 'No Changes Required'));
			else res.status(200).send(new ProductResponse(200, 'Product Updated Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
	try {
		if (!req.params.ean) res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
		Product.deleteOne({ ean: req.params.ean }).then((doc: { deletedCount: number }) => {
			if (doc.deletedCount === 0) res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
			else res.status(200).send(new ProductResponse(200, 'Product Deleted Successfully'));
		}, (error: Error & { code: number } | null) => {
			if (error) res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
		});
	} catch (error) {
		res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};
