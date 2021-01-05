import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateAisles = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/aisle/-1/1`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Aisle: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Aisle: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Aisle: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Aisle: Missing Request Body', '\x1b[0m');
		});

		await axios.patch(`${config.base}/aisle/A/1`, {
			'name': 'UPDATED TEST AISLE',
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Aisle: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid Site Code', '\x1b[0m');
		});

		await axios.patch(`${config.base}/aisle/-1/A`, {
			'name': 'UPDATED TEST AISLE',
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Aisle: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.patch(`${config.base}/aisle/-1/1`, {
			'aisle': 1,
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Aisle: Conflicting Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Aisle: Conflicting Aisle Number', '\x1b[0m');
			else if (error.response.status === 409) console.log('\x1b[32m', '[PASS] Update Aisle: Conflicting Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Aisle: Conflicting Aisle Number', '\x1b[0m');
		});

		await axios.patch(`${config.base}/aisle/-1/1`, {
			'aisle': 'A',
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid New Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid New Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Aisle: Invalid New Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Aisle: Invalid New Aisle Number', '\x1b[0m');
		});

		await axios.patch(`${config.base}/aisle/-1/1`, {
			'name': 'UPDATED TEST AISLE',
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Aisle: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Update Aisle: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};