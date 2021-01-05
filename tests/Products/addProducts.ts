import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addProducts = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/product`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Product: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Product: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Product: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Product: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/product`, {
			'ean': '1',
			'name': 'TEST PRODUCT',
			'price': 'A',
			'status': 'Live'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Product: Invalid Price', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Product: Invalid Price', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Product: Invalid Price', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Product: Invalid Price', '\x1b[0m');
		});

		await axios.post(`${config.base}/product`, {
			'ean': '2',
			'name': 'TEST PRODUCT',
			'price': 10,
			'status': 'Invalid'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Product: Invalid Status', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Product: Invalid Status', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Product: Invalid Status', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Product: Invalid Status', '\x1b[0m');
		});

		await axios.post(`${config.base}/product`, {
			'ean': '0',
			'name': 'TEST PRODUCT',
			'price': 10,
			'status': 'Live'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Product: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Product: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/product`, {
			'ean': '0',
			'name': 'TEST PRODUCT',
			'price': 10,
			'status': 'Live'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Product: Duplicate EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Product: Duplicate EAN', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Add Product: Duplicate EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Product: Duplicate EAN', '\x1b[0m');
		});

		resolve();
	});
};