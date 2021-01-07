import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addLogs = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/audit/-1`, {
			'username': 'APITESTING',
			'action': 'TEST ACTION'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Audit Log: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Audit Log: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/audit/-1`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Audit Log: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Audit Log: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Audit Log: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Audit Log: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/audit/A`, {
			'username': 'APITESTING',
			'action': 'TEST ACTION'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Audit Log: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Audit Log: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Audit Log: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Audit Log: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/audit/-1`, {
			'username': 'INVALID',
			'action': 'TEST ACTION'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Audit Log: Invalid Username', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Audit Log: Invalid Username', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Audit Log: Invalid Username', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Audit Log: Invalid Username', '\x1b[0m');
		});

		resolve();
	});
};