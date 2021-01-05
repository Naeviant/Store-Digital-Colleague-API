import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getAssignments = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/assignment/product/-1/0`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Product Assignments: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Product Assignments: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/assignment/product/A/0`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Product Assignments: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Product Assignments: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Product Assignments: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Product Assignments: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/assignment/product/-1/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Product Assignments: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Product Assignments: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Product Assignments: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Product Assignments: Invalid EAN', '\x1b[0m');
		});

		await axios.get(`${config.base}/assignment/location/-1/1/1/Multi-Location`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Location Assignments: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Location Assignments: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/assignment/location/A/1/1/Multi-Location`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Location Assignments: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/assignment/location/-1/A/1/Multi-Location`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Location Assignments: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/assignment/location/-1/1/A/Multi-Location`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Bay Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Bay Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Location Assignments: Invalid Bay Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Bay Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/assignment/location/-1/1/1/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Location Type', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Location Type', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Location Assignments: Invalid Location Type', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Location Assignments: Invalid Location Type', '\x1b[0m');
		});

		resolve();
	});
};