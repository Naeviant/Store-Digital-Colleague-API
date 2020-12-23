import { Schema, model } from 'mongoose';

const productSchema = new Schema({
	name: { type: String, required: true },
	ean: { type: String, required: true, unique: true },
	price: { type: Number, required: true }
});

// eslint-disable-next-line
export const Product = new (model as any)('Product', productSchema);