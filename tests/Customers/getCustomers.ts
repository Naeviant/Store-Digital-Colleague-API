import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getCustomers = async (token: string, customer: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/customer/${customer}`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Customer: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Customer: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/customer/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Customer: Invalid Customer Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Customer: Invalid Customer Number', '\x1b[0m');
			else if (error.response.status === 404) console.log('\x1b[32m', '[PASS] Get Customer: Invalid Customer Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Customer: Invalid Customer Number', '\x1b[0m');
		});

		resolve();
	});
};