import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addSites = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/site`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Site: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Site: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Site: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Site: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/product`, {
			'code': 'A',
			'name': 'TESTSITE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/site`, {
			'code': -1,
			'name': 'TESTSITE'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Site: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Site: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/site`, {
			'code': -1,
			'name': 'TESTSITE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Site: Duplicate Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Site: Duplicate Site Code', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Add Site: Duplicate Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Site: Duplicate Site Code', '\x1b[0m');
		});

		resolve();
	});
};