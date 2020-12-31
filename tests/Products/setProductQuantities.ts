import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const setProductQuantities = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/product/quantity/-1/0`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Set Product Quantities: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Set Product Quantities: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Set Product Quantities: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Set Product Quantities: Missing Request Body', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/quantity/-1/0`, {
			'quantity': '1'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid Quantity', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid Quantity', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Set Product Quantities: Invalid Quantity', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid Quantity', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/quantity/A/0`, {
			'quantity': 1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Set Product Quantities: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid Site Code', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/quantity/-1/A`, {
			'quantity': 1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Set Product Quantities: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Set Product Quantities: Invalid EAN', '\x1b[0m');
		});

		await axios.patch(`${config.base}/product/quantity/-1/0`, {
			'quantity': 1
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Set Product Quantities: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Set Product Quantities: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};