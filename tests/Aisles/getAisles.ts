import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getAisles = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/aisle/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Aisles at Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Aisles at Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Aisles at Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Aisles at Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/aisle/-1/1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Aisle at Site: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Get Aisle at Site: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/aisle/A/1`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Aisle at Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Aisle at Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Aisle at Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Aisle at Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/aisle/-1/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Aisle at Site: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Aisle at Site: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 404) console.log('\x1b[32m', '[PASS] Get Aisle at Site: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Aisle at Site: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/aisle/-1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Aisles at Site: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Get Aisles at Site: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};