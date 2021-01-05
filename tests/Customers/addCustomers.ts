import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addCustomers = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/customer`, {
			title: 'Mr',
			firstName: 'John',
			lastName: 'Smith',
			email: 'example@example.com',
			password: 'password',
			addressNumberName: '1',
			addressStreet1: 'Test Street',
			addressCity: 'Test Town',
			addressPostcode: 'AB12CD',
			mobilePhone: '07123456789'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Add Customer: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Add Customer: Valid Request', '\x1b[0m');
		});

		await axios.post(`${config.base}/customer`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Customer: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Customer: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Customer: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Customer: Missing Request Body', '\x1b[0m');
		});

		await axios.post(`${config.base}/customer`, {
			title: 'Mr',
			firstName: 'John',
			lastName: 'Smith',
			email: 'INVALID',
			password: 'password',
			addressNumberName: '1',
			addressStreet1: 'Test Street',
			addressCity: 'Test Town',
			addressPostcode: 'AB12CD',
			mobilePhone: '07123456789'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Email Address', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Email Address', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Customer: Invalid Email Address', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Email Address', '\x1b[0m');
		});
		
		await axios.post(`${config.base}/customer`, {
			title: 'Mr',
			firstName: 'John',
			lastName: 'Smith',
			email: 'example@example.com',
			password: 'password',
			addressNumberName: '1',
			addressStreet1: 'Test Street',
			addressCity: 'Test Town',
			addressPostcode: 'AB12CD',
			mobilePhone: 'INVALID'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Mobile Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Mobile Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Customer: Invalid Mobile Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Mobile Number', '\x1b[0m');
		});

		await axios.post(`${config.base}/customer`, {
			title: 'Mr',
			firstName: 'John',
			lastName: 'Smith',
			email: 'example@example.com',
			password: 'password',
			addressNumberName: '1',
			addressStreet1: 'Test Street',
			addressCity: 'Test Town',
			addressPostcode: 'INVALID',
			mobilePhone: '07123456789'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Postcode', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Postcode', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Customer: Invalid Postcode', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Postcode', '\x1b[0m');
		});

		await axios.post(`${config.base}/customer`, {
			title: 'INVALID',
			firstName: 'John',
			lastName: 'Smith',
			email: 'example@example.com',
			password: 'password',
			addressNumberName: '1',
			addressStreet1: 'Test Street',
			addressCity: 'Test Town',
			addressPostcode: 'AB12CD',
			mobilePhone: '07123456789'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Title', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Title', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Customer: Invalid Title', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Customer: Invalid Title', '\x1b[0m');
		});

		resolve();
	});
};