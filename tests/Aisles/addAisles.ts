import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addAisles = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/aisle/-1`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Aisle: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Aisle: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Aisle: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Aisle: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/aisle/-1`, {
			'aisle': '99'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Aisle: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Aisle: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Aisle: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Aisle: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/aisle/-`, {
			'aisle': 2,
			'name': 'TEST AISLE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Aisle: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Aisle: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Aisle: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Aisle: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/aisle/-1`, {
			'aisle': 1,
			'name': 'TEST AISLE'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Aisle: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Aisle: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/aisle/-1`, {
			'aisle': 1,
			'name': 'TEST AISLE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Aisle: Duplicate Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Aisle: Duplicate Aisle Number', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Add Aisle: Duplicate Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Aisle: Duplicate Aisle Number', '\x1b[0m');
		});

		resolve();
	});
};