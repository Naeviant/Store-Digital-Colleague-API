import { Document, Schema, model } from 'mongoose';
import { Site } from './Site';
import { ProductQuantity } from './ProductQuantity';

export interface IProduct extends Document {
	name: string;
	ean: string;
	price: number;
	status: string;
}

const productSchema = new Schema({
	name: { type: String, required: true },
	ean: { type: String, required: true, unique: true },
	price: { type: Number, required: true, min: 0 },
	status: { type: String, required: true, enum: ['Live', 'Orders Blocked', 'Discontinued'], default: 'Live' }
});

productSchema.post('save', (doc) => {
	Site.find({}, async (err, sites) => {
		sites.forEach(async site => {
			const newProductQuantity = new ProductQuantity({
				product: doc._id,
				site: site._id,
				quantity: 0
			});
			await newProductQuantity.save();
		});
	});
});

export const Product = model <IProduct>('Product', productSchema);