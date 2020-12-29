import { Document, Schema, model } from 'mongoose';
import { Product } from './Product';
import { ProductQuantity } from './ProductQuantity';

export interface ISite extends Document {
	name: string;
	code: string;
}

const siteSchema = new Schema({
	name: { type: String, required: true },
	code: { type: Number, required: true, unique: true }
});

siteSchema.post('save', (doc) => {
	Product.find({}, async (err, products) => {
		products.forEach(async product => {
			const newProductQuantity = new ProductQuantity({
				product: product._id,
				site: doc._id,
				quantity: 0
			});
			await newProductQuantity.save();
		});
	});
});

export const Site = model<ISite>('Site', siteSchema);