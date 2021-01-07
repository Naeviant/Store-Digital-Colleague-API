import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addDeliveries = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/delivery`, {
		    'inbound': -1,
		    'outbound': 0,
		    'arrivesAt': '2021-12-31',
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Delivery: Valid Request', '\x1b[0m');
		}).catch((error) => {
			console.log('\x1b[31m', '[FAIL] Add Delivery: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/delivery`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Delivery: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Delivery: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Delivery: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Delivery: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/delivery`, {
		    'inbound': -1,
		    'outbound': 0,
		    'arrivesAt': '2021-12-31',
		    'products': []
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Delivery: No Products', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Delivery: No Products', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Delivery: No Products', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Delivery: No Products', '\x1b[0m');
		});

		await axios.post(`${config.base}/delivery`, {
		    'inbound': 'A',
		    'outbound': 0,
		    'arrivesAt': '2021-12-31',
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Inbound Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Inbound Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Delivery: Invalid Inbound Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Inbound Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/delivery`, {
		    'inbound': -1,
		    'outbound': 'A',
		    'arrivesAt': '2021-12-31',
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Outbound Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Outbound Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Delivery: Invalid Outbound Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Outbound Site Code', '\x1b[0m');
		});

		await axios.post(`${config.base}/delivery`, {
		    'inbound': -1,
		    'outbound': 0,
		    'arrivesAt': 'INVALID',
		    'products': [
		        {
		            'ean': '0',
		            'quantity': 2
		        }
		    ]
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Date', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Date', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Delivery: Invalid Date', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Delivery: Invalid Date', '\x1b[0m');
		});

		resolve();
	});
};