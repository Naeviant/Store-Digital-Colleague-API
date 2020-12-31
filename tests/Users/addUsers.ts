import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addUsers = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/user`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add User: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add User: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add User: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add User: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/user`, {
			firstName: 'API',
			lastName: 'Testing',
			username: 'APITESTING2',
			password: 'APITESTING2',
			userType: 'Admin',
			code: 'A'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add User: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add User: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add User: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add User: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/user`, {
			firstName: 'API',
			lastName: 'Testing',
			username: 'APITESTING3',
			password: 'APITESTING3',
			userType: 'Invalid',
			code: -1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add User: Invalid User Type', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add User: Invalid User Type', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add User: Invalid User Type', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add User: Invalid User Type', '\x1b[0m');
		});

		await axios.post(`${config.base}/user`, {
			firstName: 'API',
			lastName: 'Testing',
			username: 'APITESTING',
			password: 'APITESTING',
			userType: 'Admin',
			code: -1
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add User: Conflicting Username', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add User: Conflicting Username', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Add User: Conflicting Username', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add User: Conflicting Username', '\x1b[0m');
		});

		await axios.post(`${config.base}/user`, {
			firstName: 'API',
			lastName: 'Testing',
			username: 'APITESTING',
			password: 'APITESTING',
			userType: 'Admin',
			code: -1
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add User: Valid Request', '\x1b[0m');
		}).catch((error) => {
			console.log('\x1b[31m', '[FAIL] Add User: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};