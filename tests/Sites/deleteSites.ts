import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const deleteSites = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.delete(`${config.base}/site/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.delete(`${config.base}/site/-1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Delete Site: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Delete Site: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};