import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateCollections = async (token: string, collection: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/collection/${collection}`, {
		    'status': 'In Progress',
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Collection: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Update Collection: Valid Request', '\x1b[0m');
		});

		await axios.patch(`${config.base}/collection/${collection}`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Collection: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Collection: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Collection: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Collection: Missing Request Body', '\x1b[0m');
		});

		resolve();
	});
};