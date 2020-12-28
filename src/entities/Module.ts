import { Document, Schema, model } from 'mongoose';
import { IProduct } from './Product';

interface IModuleProduct extends Document {
	product: IProduct['_id'],
	facings: number;
}

export interface IModule extends Document {
	discriminator: string;
	name: string;
	parts: IModuleProduct[];
	startDate: Date;
	endDate: Date;
}

const moduleProductSchema = new Schema({
	product: { type: Schema.Types.ObjectId, required: true },
	facings: { type: Number, required: true }
});

const moduleSchema = new Schema({
	discriminator: { type: String, required: true, unique: true, uppercase: true, regex: /^\S+$/ },
	name: { type: String, required: true },
	products: [moduleProductSchema],
	startDate: { type: Date, required: true },
	endDate: { type: Date, required: true }
});

export const Module = model <IModule>('Module', moduleSchema);
export const ModuleProduct = model <IModuleProduct>('ModuleProduct', moduleProductSchema);