import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addModuleInstances = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/module/site`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Instance: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Instance: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Instance: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Instance: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site`, {
			'discriminator': 'INVALID',
			'code': -1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Instance: Invalid Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Instance: Invalid Module Discriminator', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Instance: Invalid Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Instance: Invalid Module Discriminator', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site`, {
			'discriminator': 'APIMODULE',
			'code': 'A'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Instance: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Instance: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Instance: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Instance: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site`, {
			'discriminator': 'APIMODULE',
			'code': -1
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Module Instance: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Instance: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site`, {
			'discriminator': 'APIMODULE',
			'code': -1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Instance: Duplicate Instance', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Instance: Duplicate Instance', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Add Module Instance: Duplicate Instance', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Instance: Duplicate Instance', '\x1b[0m');
		});

		resolve();
	});
};