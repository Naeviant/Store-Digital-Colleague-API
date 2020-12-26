import { Document, Schema, model } from 'mongoose';
import { IBay } from './Location';
import { IProduct } from './Product';

export interface IAssignment extends Document {
	product: IProduct['_id'];
	bay: IBay['_id'];
}

const assignmentSchema = new Schema({
	product: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
	bay: { type: Schema.Types.ObjectId, required: true, ref: 'Bay' }
});

export const Assignment = model <IAssignment>('Assignment', assignmentSchema);