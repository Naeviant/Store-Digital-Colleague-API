import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateBays = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/bay/-1/1/1`, {
			'bay': 2,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Bay: Valid Request', '\x1b[0m');
		}).catch((error) => {
			console.log('\x1b[31m', '[FAIL] Update Bay: Valid Request', '\x1b[0m');
		});

		await axios.patch(`${config.base}/bay/-1/2/2`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Bay: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Bay: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Bay: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Bay: Missing Request Body', '\x1b[0m');
		});

		await axios.patch(`${config.base}/bay/A/1/2`, {
			'bay': 1,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Bay: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Site Code', '\x1b[0m');
		});

		await axios.patch(`${config.base}/bay/-1/A/2`, {
			'bay': 1,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Bay: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.patch(`${config.base}/bay/-1/1/A`, {
			'bay': 1,
			'moduleLimit': 1,
			'allowsMultiLocation': true,
			'allowsClearance': false,
			'allowsDisplay': false,
			'allowsOverstock': true,
			'allowsTopstock': true,
			'allowsStockroom': false
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Bay: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Bay: Invalid Bay Number', '\x1b[0m');
		});

		resolve();
	});
};