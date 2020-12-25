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

export interface IAisle extends	Document {
	aisle: number;
	site: ISite['_id'];
}

const aisleSchema = new Schema({
	aisle: { type: Number, required: true },
	site: { type: Schema.Types.ObjectId, required: true, ref: 'Site' }
});

export const Aisle = model<IAisle>('Aisle', aisleSchema);