import { connect } from 'mongoose';
import { config } from './config';

export function makeConnection(): void {
	connect(config.dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	}, (error: Error | null) => {
		if (error) throw error;
		console.log('Successfully Connected to Database');
	});
}