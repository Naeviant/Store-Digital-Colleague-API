import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
	port: process.env.PORT ?? 3000,
	dbURI: process.env.DB_URI ?? ''
};
