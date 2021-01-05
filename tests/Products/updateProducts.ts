import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateProducts = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/product/0`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Product: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Product: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Product: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Product: Missing Request Body', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/-`, {
			'name': 'TEST PRODUCT'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Product: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Product: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Product: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Product: Invalid EAN', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/-`, {
			'price': '10'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Product: Invalid Price', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Product: Invalid Price', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Product: Invalid Price', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Product: Invalid Price', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/-`, {
			'status': 'Invalid'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Product: Invalid Status', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Product: Invalid Status', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Product: Invalid Status', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Product: Invalid Status', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/0`, {
			'name': 'UPDATED TEST PRODUCT',
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Product: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Update Product: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};