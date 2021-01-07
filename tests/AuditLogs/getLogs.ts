import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getLogs = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/audit/-1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Audit Logs: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Audit Logs: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/audit/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Audit Logs: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Audit Logs: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Audit Logs: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Audit Logs: Invalid Site Code', '\x1b[0m');
		});

		resolve();
	});
};