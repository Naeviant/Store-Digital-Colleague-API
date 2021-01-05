import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateSites = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/site/-1`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Site: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Site: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Site: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Site: Missing Request Body', '\x1b[0m');
		});

		await axios.patch(`${config.base}/site/A`, {
			'name': 'TEST SITE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.patch(`${config.base}/site/-1`, {
			'code': 0
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Site: Conflicting Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Site: Conflicting Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Site: Conflicting Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Site: Conflicting Site Code', '\x1b[0m');
		});

		await axios.patch(`${config.base}/site/-1`, {
			'code': 'TEST SITE'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Site: Invalid New Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Site: Invalid New Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Site: Invalid New Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Site: Invalid New Site Code', '\x1b[0m');
		});

		await axios.patch(`${config.base}/site/-1`, {
			'name': 'UPDATED TEST SITE',
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Site: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Update Site: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};