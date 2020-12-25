import { Document, Schema, model } from 'mongoose';
import { ISite } from './Site';

export interface IAisle extends	Document {
	aisle: number;
	site: ISite['_id'];
}

const aisleSchema = new Schema({
	aisle: { type: Number, required: true },
	site: { type: Schema.Types.ObjectId, required: true, ref: 'Site' }
});

export const Aisle = model<IAisle>('Aisle', aisleSchema);