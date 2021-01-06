import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getCollections = async (token: string, customer: number, collection: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/collection/${collection}`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Collection: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Collection: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/collection/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Collection: Invalid Collection Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Collection: Invalid Collection Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Collection: Invalid Collection Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Collection: Invalid Collection Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/collection/customer/${customer}`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Customer Collections: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Customer Collections: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/collection/customer/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Customer Collections: Invalid Customer Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Customer Collections: Invalid Customer Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Customer Collections: Invalid Customer Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Customer Collections: Invalid Customer Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/collection/site/-1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Site Collections: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Site Collections: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/collection/site/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Site Collections: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Site Collections: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Site Collections: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Site Collections: Invalid Site Code', '\x1b[0m');
		});

		resolve();
	});
};