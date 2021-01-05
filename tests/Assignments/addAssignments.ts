import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addAssignments = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/assignment/-1/1/1`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Assignment: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Assignment: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Assignment: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/assignment/-1/1/1`, {
			'ean': 0,
			'type': 'Multi-Location'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Assignment: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid EAN', '\x1b[0m');
		});

		await axios.post(`${config.base}/assignment/-1/1/1`, {
			'ean': '0',
			'type': 'Invalid'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Assignment Type', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Assignment Type', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Assignment: Invalid Assignment Type', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Assignment Type', '\x1b[0m');
		});

		await axios.post(`${config.base}/assignment/-1/1/1`, {
			'ean': '0',
			'type': 'Stockroom'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Unsupported Assignment Type', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Assignment: Unsupported Assignment Type', '\x1b[0m');
			else if (error.response.status === 422) console.log('\x1b[32m', '[PASS] Add Assignment: Unsupported Assignment Type', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Assignment: Unsupported Assignment Type', '\x1b[0m');
		});

		await axios.post(`${config.base}/assignment/A/1/1`, {
			'ean': '0',
			'type': 'Multi-Location'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Assignment: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/assignment/-1/A/1`, {
			'ean': '0',
			'type': 'Multi-Location'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Assignment: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/assignment/-1/1/A`, {
			'ean': '0',
			'type': 'Multi-Location'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Assignment: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Assignment: Invalid Bay Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/assignment/-1/1/1`, {
			'ean': '0',
			'type': 'Multi-Location'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Assignment: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Assignment: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};