import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const deleteAssignments = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.delete(`${config.base}/assignment/-1/1/1/Multi-Location/0/`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Assignment', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Assignment', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Assignment: Invalid Assignment', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Assignment', '\x1b[0m');
		});

		await axios.delete(`${config.base}/assignment/A/1/1/Multi-Location/0/`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Assignment: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Site Code', '\x1b[0m');
		});

		await axios.delete(`${config.base}/assignment/-1/A/1/Multi-Location/0/`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Assignment: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.delete(`${config.base}/assignment/-1/1/A/Multi-Location/0/`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Assignment: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Bay Number', '\x1b[0m');
		});

		await axios.delete(`${config.base}/assignment/-1/1/1/Invalid/0/`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Assignment Type', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Assignment Type', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Assignment: Invalid Assignment Type', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid Bay Number', '\x1b[0m');
		});

		await axios.delete(`${config.base}/assignment/-1/1/A/Multi-Location/A/`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Assignment: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Assignment: Invalid EAN', '\x1b[0m');
		});

		await axios.delete(`${config.base}/assignment/-1/1/1/Multi-Location/0/`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Delete Assignment: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Delete Assignment: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};