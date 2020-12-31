import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateUsers = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/user/UPDATETESTING`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update User: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update User: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update User: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update User: Missing Request Body', '\x1b[0m');
		});

		await axios.patch(`${config.base}/user/UPDATETESTING`, {
			userType: 'Invalid'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update User: Invalid User Type', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update User: Invalid User Type', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update User: Invalid User Type', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update User: Invalid User Type', '\x1b[0m');
		});

		await axios.patch(`${config.base}/user/UPDATETESTING`, {
			username: 'APITEST'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update User: Conflicting Username', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update User: Conflicting Username', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Update User: Conflicting Username', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update User: Conflicting Username', '\x1b[0m');
		});

		await axios.patch(`${config.base}/user/UPDATETESTING`, {
			code: 'A'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update User: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update User: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update User: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update User: Invalid Site Code', '\x1b[0m');
		});

		await axios.patch(`${config.base}/user/APITESTING`, {
			firstName: 'UPDATE',
			lastName: 'TESTING',
			username: 'UPDATETESTING',
			password: 'UPDATETESTING',
			userType: 'Admin',
			code: 0
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update User: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Update User: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};