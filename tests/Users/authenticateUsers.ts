import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const authenticateUsers = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/authenticate`, headers).then((resp) => {
			console.log('\x1b[31m', '[FAIL] Authenticate User: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Authenticate User: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Authenticate User: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Authenticate User: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/authenticate`, {
			username: 'APITESTING',
			password: 'WRONG'
		}, headers).then((resp) => {
			console.log('\x1b[31m', '[FAIL] Authenticate User: Invalid Credentials', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Authenticate User: Invalid Credentials', '\x1b[0m');
			else if (error.response.status === 401) console.log('\x1b[32m', '[PASS] Authenticate User: Invalid Credentials', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Authenticate User: Invalid Credentials', '\x1b[0m');
		});

		await axios.post(`${config.base}/authenticate`, {
			username: 'APITESTING',
			password: 'APITESTING'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Authenticate User: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Authenticate User: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};