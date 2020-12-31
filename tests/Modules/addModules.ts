import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addModules = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/module`, {
			'discriminator': 'APIMODULE',
			'name': 'API MODULE',
			'startDate': '1970-01-01',
			'endDate': '9999-12-31'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module: Duplicate Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module: Duplicate Module Discriminator', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Add Module: Duplicate Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module: Duplicate Module Discriminator', '\x1b[0m');
		});

		await axios.post(`${config.base}/module`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/module`, {
			'discriminator': 'OTHERAPIMODULE',
			'name': 'API MODULE',
			'startDate': 'Invalid',
			'endDate': 'Invalid'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module: Invalid Dates', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module: Invalid Dates', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module: Invalid Dates', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module: Invalid Dates', '\x1b[0m');
		});

		await axios.post(`${config.base}/module`, {
			'discriminator': 'APIMODULE',
			'name': 'API MODULE',
			'startDate': '1970-01-01',
			'endDate': '9999-12-31'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Module: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Module: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};