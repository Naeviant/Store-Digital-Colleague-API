import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const deleteBays = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.delete(`${config.base}/bay/-1/1/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Bay: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Bay Number', '\x1b[0m');
		});

		await axios.delete(`${config.base}/bay/-1/A/2`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Bay: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.delete(`${config.base}/bay/A/1/2`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Bay: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Bay: Invalid Site Code', '\x1b[0m');
		});

		await axios.delete(`${config.base}/bay/-1/1/2`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Delete Bay: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Delete Bay: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};