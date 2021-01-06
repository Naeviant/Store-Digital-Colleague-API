import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateCustomers = async (token: string, customer: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/customer/${customer}`, {
			title: 'Ms',
			firstName: 'Jo',
			lastName: 'Bloggs',
			email: 'example2@example.com',
			password: 'password123',
			addressNumberName: '5',
			addressStreet1: 'Other Test Street',
			addressCity: 'Other Test Town',
			addressPostcode: 'EF34GH',
			mobilePhone: '07987654321'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Customer: Valid Request', '\x1b[0m');
		}).catch((error) => {
			console.log(error)
			console.log('\x1b[31m', '[FAIL] Update Customer: Valid Request', '\x1b[0m');
		});

		await axios.patch(`${config.base}/customer/${customer}`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Customer: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Customer: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Customer: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Customer: Missing Request Body', '\x1b[0m');
		});

		await axios.patch(`${config.base}/customer/INVALID`, {
			title: 'Ms',
			firstName: 'Jo',
			lastName: 'Bloggs',
			email: 'example2@example.com',
			password: 'password123',
			addressNumberName: '5',
			addressStreet1: 'Other Test Street',
			addressCity: 'Other Test Town',
			addressPostcode: 'EF34GH',
			mobilePhone: '07987654321'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Customer Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Customer Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Customer: Invalid Customer Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Customer Number', '\x1b[0m');
		});

		await axios.patch(`${config.base}/customer/${customer}`, {
			email: 'INVALID'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Email Address', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Email Address', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Customer: Invalid Email Address', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Email Address', '\x1b[0m');
		});
		
		await axios.patch(`${config.base}/customer/${customer}`, {
			mobilePhone: 'INVALID'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Mobile Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Mobile Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Customer: Invalid Mobile Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Mobile Number', '\x1b[0m');
		});

		await axios.patch(`${config.base}/customer/${customer}`, {
			addressPostcode: 'INVALID'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Postcode', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Postcode', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Customer: Invalid Postcode', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Postcode', '\x1b[0m');
		});

		await axios.patch(`${config.base}/customer/${customer}`, {
			title: 'INVALID'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Title', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Title', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Customer: Invalid Title', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Customer: Invalid Title', '\x1b[0m');
		});

		resolve();
	});
};