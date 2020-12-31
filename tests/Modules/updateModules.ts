import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateModules = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/module/INVALID`, {
			'discriminator': 'UPDATEDAPIMODULE',
			'name': 'UPDATED API MODULE',
			'startDate': '1970-01-01',
			'endDate': '9999-12-31'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Module: Invalid Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Module: Invalid Module Discriminator', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Module: Invalid Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Module: Invalid Module Discriminator', '\x1b[0m');
		});

		await axios.patch(`${config.base}/module/UPDATEDAPIMODULE`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Module: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Module: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Module: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Module: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/UPDATEDAPIMODULE`, {
			'startDate': 'Invalid',
			'endDate': 'Invalid'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Module: Invalid Dates', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Module: Invalid Dates', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Module: Invalid Dates', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Module: Invalid Dates', '\x1b[0m');
		});

		await axios.post(`${config.base}/module`, {
			'discriminator': 'UPDATEDAPIMODULE',
			'name': 'UPDATED API MODULE',
			'startDate': '1970-01-01',
			'endDate': '9999-12-31'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Module: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Update Module: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};