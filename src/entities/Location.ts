import { Document, Schema, model } from 'mongoose';
import { ISite } from './Site';

export interface IAisle extends	Document {
	name: string;
	aisle: number;
	site: ISite['_id'];
}

const aisleSchema = new Schema({
	name: { type: String, required: true },
	aisle: { type: Number, required: true },
	site: { type: Schema.Types.ObjectId, required: true, ref: 'Site' }
});

export const Aisle = model<IAisle>('Aisle', aisleSchema);

export interface IBay extends Document {
	bay: number;
	aisle: IAisle['_id'];
	moduleLimit: number;
	allowsMultiLocation: boolean;
	allowsClearance: boolean;
	allowsDisplay: boolean;
	allowsOverstock: boolean;
	allowsTopstock: boolean;
	allowsStockroom: boolean;
}

const baySchema = new Schema({
	bay: { type: Number, required: true },
	aisle: { type: Schema.Types.ObjectId, required: true, ref: 'Aisle' },
	moduleLimit: { type: Number, min: -1, required: true },
	allowsMultiLocation: { type: Boolean, required: true },
	allowsClearance: { type: Boolean, required: true },
	allowsDisplay: { type: Boolean, required: true },
	allowsOverstock: { type: Boolean, required: true },
	allowsTopstock: { type: Boolean, required: true },
	allowsStockroom: { type: Boolean, required: true }
});

export const Bay = model<IBay>('Bay', baySchema);