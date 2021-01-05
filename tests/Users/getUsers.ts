import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getUsers = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/user/APITESTING_`, headers).then((resp) => {
			console.log('\x1b[31m', '[FAIL] Get User: Invalid Username', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get User: Invalid Username', '\x1b[0m');
			else if (error.response.status === 404) console.log('\x1b[32m', '[PASS] Get User: Invalid Username', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get User: Invalid Username', '\x1b[0m');
		});

		await axios.get(`${config.base}/user/APITESTING`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get User: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get User: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};