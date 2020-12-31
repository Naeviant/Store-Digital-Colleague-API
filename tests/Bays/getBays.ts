import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getBays = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/bay/A/1`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Bays at Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Bays at Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Bays at Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Bays at Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/bay/-1/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Bays at Site: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Bays at Site: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Bays at Site: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Bays at Site: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/bay/-1/1/1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Bay at Site: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Get Bay at Site: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/bay/A/1/1`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Bay at Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/bay/-1/A/1`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Bay at Site: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/bay/-1/1/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Bay at Site: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Bay at Site: Invalid Bay Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/bay/-1/1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Bays at Site: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Get Bays at Site: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};