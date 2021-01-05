import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addBays = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/bay/-1/1`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Bay: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Bay: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Bay: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/bay/-1/1`, {
			'bay': 'A',
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Bay: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Bay Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/bay/-1/1`, {
			'bay': 3,
			'moduleLimit': 'A',
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Module Limit', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Module Limit', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Bay: Invalid Module Limit', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Module Limit', '\x1b[0m');
		});

		await axios.post(`${config.base}/bay/-1/1`, {
			'bay': 4,
			'moduleLimit': 1,
			'allowsMultiLocation': 'invalid',
			'allowsClearance': 'invalid',
			'allowsDisplay': 'invalid',
			'allowsOverstock': 'invalid',
			'allowsTopstock': 'invalid',
			'allowsStockroom': 'invalid'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Location Types', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Location Types', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Bay: Invalid Location Types', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Location Types', '\x1b[0m');
		});

		await axios.post(`${config.base}/bay/A/1`, {
			'bay': 5,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Bay: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/bay/-1/A`, {
			'bay': 6,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Bay: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Bay: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/bay/-1/1`, {
			'bay': 1,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Bay: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/bay/-1/1`, {
			'bay': 1,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Bay: Duplicate Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Bay: Duplicate Bay Number', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Add Bay: Duplicate Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Bay: Duplicate Bay Number', '\x1b[0m');
		});

		resolve();
	});
};