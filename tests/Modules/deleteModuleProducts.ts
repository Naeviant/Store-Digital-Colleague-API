import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const deleteModuleProducts = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.delete(`${config.base}/module/APIMODULE/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Module Product: Invalid Sequence', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Module Product: Invalid Sequence', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Module Product: Invalid Sequence', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Module Product: Invalid Sequence', '\x1b[0m');
		});

		await axios.delete(`${config.base}/module/INVALID/1`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Module Product: Invalid Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Module Product: Invalid Module Discriminator', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Module Product: Invalid Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Module Product: Invalid Module Discriminator', '\x1b[0m');
		});

		await axios.delete(`${config.base}/module/APIMODULE/1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Delete Module Product: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Delete Module Product: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};