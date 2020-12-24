import { Document, Schema, model } from 'mongoose';

export interface IProduct extends Document {
	name: string;
	ean: string;
	price: number;
}

const productSchema = new Schema({
	name: { type: String, required: true },
	ean: { type: String, required: true, unique: true },
	price: { type: Number, required: true }
});

export const Product = model <IProduct>('Product', productSchema);