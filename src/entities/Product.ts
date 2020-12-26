import { Document, Schema, model } from 'mongoose';

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

export const Product = model <IProduct>('Product', productSchema);