import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addCollections = async (token: string, customer: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/collection`, {
		    'code': -1,
		    'customer': customer,
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Collection: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Collection: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/collection`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Collection: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Collection: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Collection: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Collection: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/collection`, {
		    'code': -1,
		    'customer': customer,
		    'products': []
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Collection: No Products', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Collection: No Products', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Collection: No Products', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Collection: No Products', '\x1b[0m');
		});

		await axios.post(`${config.base}/collection`, {
		    'code': 'A',
		    'customer': customer,
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Collection: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Collection: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Collection: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Collection: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/collection`, {
		    'code': -1,
		    'customer': 'INVALID',
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Collection: Invalid Customer Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Collection: Invalid Customer Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Collection: Invalid Customer Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Collection: Invalid Customer Number', '\x1b[0m');
		});

		resolve();
	});
};