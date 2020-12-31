import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addModuleBay = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/module/site/-1/1/1`, {
			'discriminator': 'INVALID'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Module Discriminator', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Assign Module to Bay: Invalid Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Module Discriminator', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site/A/1/1`, {
			'discriminator': 'APIMODULE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Assign Module to Bay: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site/-1/A/1`, {
			'discriminator': 'APIMODULE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Assign Module to Bay: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site/-1/1/A`, {
			'discriminator': 'APIMODULE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Assign Module to Bay: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Invalid Bay Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site/-1/1/1`, {
			'discriminator': 'APIMODULE'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Assign Module to Bay: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/site/-1/1/1`, {
			'discriminator': 'APIMODULE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Duplicate Instance', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Duplicate Instance', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Assign Module to Bay: Duplicate Instance', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Assign Module to Bay: Duplicate Instance', '\x1b[0m');
		});

		resolve();
	});
};