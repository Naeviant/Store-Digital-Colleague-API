import { Document, Schema, model } from 'mongoose';

export interface ISite extends Document {
	name: string;
	code: string;
}

const siteSchema = new Schema({
	name: { type: String, required: true },
	code: { type: Number, required: true, unique: true, index: true }
});

export const Site = model<ISite>('Site', siteSchema);