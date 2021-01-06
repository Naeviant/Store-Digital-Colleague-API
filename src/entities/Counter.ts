import { Document, Schema, model } from 'mongoose';

export interface ICounter extends Document {
	seq: number;
}

const counterSchema = new Schema({
	seq: { type: Number, default: 0 }
});

export const Counter = model <ICounter>('Counter', counterSchema);