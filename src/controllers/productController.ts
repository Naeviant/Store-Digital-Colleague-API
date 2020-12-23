import { Request, Response } from 'express';
import { Product } from '../entities/Product';
import { ProductResponse } from '../helpers/generateResponse';

class Update {
	name?: string;
	price?: number;
}

export const addProduct = (req: Request, res: Response): Response => {
	try {
		const newProduct = new Product(req.body);
		return newProduct.save((error: Error & { code: number } | null) => {
			if (error && error.code === 11000) return res.status(400).send(new ProductResponse(400, 'Cannot Add Product: EAN Already in Use'));
			if (error) return res.status(400).send(new ProductResponse(400, 'Cannot Add Product: Invalid Request Body'));
			return res.status(201).send(new ProductResponse(201, 'Product Added Successfully'));
		});
	} catch (error) {
		return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const getProduct = (req: Request & { params: { ean: string } }, res: Response): Response => {
	try {
		if (!req.params.ean) return res.status(400).send(new ProductResponse(404, 'Product Not Found'));
		return Product.findOne({ ean: req.params.ean }, { _id: 0, __v: 0 }, (error: Error | null, doc: typeof Product) => {
			if (error) return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
			if (!doc) return res.status(400).send(new ProductResponse(404, 'Product Not Found'));
			return res.status(200).send(new ProductResponse(200, 'Product Retrieved Successfully', doc));
		});
	} catch (error) {
		return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const getAllProducts = (req: Request, res: Response): Response => {
	try {
		return Product.find({}, { _id: 0, __v: 0 }, (error: Error | null, docs: typeof Product[]) => {
			if (error) return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
			return res.status(200).send(new ProductResponse(200, 'Products Retrieved Successfully', docs));
		});
	} catch (error) {
		return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const updateProduct = (req: Request & { params: { ean: string } }, res: Response): Response => {
	try {
		if (!req.params.ean) return res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
		const update = new Update();
		if (req.body.name) update.name = req.body.name;
		if (req.body.price) update.price = req.body.price;
		if (Object.keys(update).length === 0) return res.status(400).send(new ProductResponse(400, 'Invalid Request Body'));
		return Product.updateOne({ ean: req.params.ean }, { $set: update }, (error: Error | null, docs: { n: number, nModified: number }) => {
			if (error) return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
			if (docs.n === 0) return res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
			if (docs.nModified === 0) return res.status(200).send(new ProductResponse(200, 'No Changes Required'));
			return res.status(200).send(new ProductResponse(200, 'Product Updated Successfully'));
		});
	} catch (error) {
		return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};

export const deleteProduct = (req: Request & { params: { ean: string } }, res: Response): Response => {
	try {
		if (!req.params.ean) return res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
		return Product.deleteOne({ ean: req.params.ean }, (error: Error | null, doc: { deletedCount: number }) => {
			if (error) return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
			if (doc.deletedCount === 0) return res.status(400).send(new ProductResponse(400, 'Invalid EAN Provided'));
			return res.status(200).send(new ProductResponse(200, 'Product Deleted Successfully'));
		});
	} catch (error) {
		return res.status(500).send(new ProductResponse(500, 'Something Went Wrong'));
	}
};
