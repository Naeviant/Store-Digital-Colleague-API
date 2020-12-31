import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addModuleProducts = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/module/APIMODULE`, {
			'ean': 'A',
			'facings': 1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Product: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid EAN', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/APIMODULE`, {
			'ean': '0',
			'facings': 'A'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Facings', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Facings', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Product: Invalid Facings', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Facings', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/APIMODULE`, {
			'ean': '0',
			'facings': 1,
			'sequence': 'A'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Sequence', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Sequence', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Product: Invalid Sequence', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Sequence', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/INVALID`, {
			'ean': '0',
			'facings': 1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Module Discriminator', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Product: Invalid Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Product: Invalid Module Discriminator', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/APIMODULE`, {
			'ean': '0',
			'facings': 1
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Module Product: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Product: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/module/APIMODULE`, {
			'ean': '0',
			'facings': -1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Module Product: Too Few Facings', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Module Product: Too Few Facings', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Module Product: Too Few Facings', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Module Product: Too Few Facings', '\x1b[0m');
		});

		resolve();
	});
};