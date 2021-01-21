import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const addReviews = async (token: string, customerNumber: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.post(`${config.base}/review`, {}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Review: Missing Request Body', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Review: Missing Request Body', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Review: Missing Request Body', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Review: Missing Request Body', '\x1b[0m');
        });
        
        await axios.post(`${config.base}/review`, {
            'ean': '0',
            'customer': customerNumber,
            'rating': 'A'
        }, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Review: Invalid Rating', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Review: Invalid Rating', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Review: Invalid Rating', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Review: Invalid Rating', '\x1b[0m');
        });
        
        await axios.post(`${config.base}/review`, {
            'ean': 'A',
            'customer': customerNumber,
            'rating': 5
        }, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Review: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Review: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Review: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Review: Invalid EAN', '\x1b[0m');
        });
        
        await axios.post(`${config.base}/review`, {
            'ean': '0',
            'customer': 'A',
            'rating': 5
        }, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Add Review: Invalid Customer Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Add Review: Invalid Customer Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Add Review: Invalid Customer Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Add Review: Invalid Customer Number', '\x1b[0m');
        });
        
        await axios.post(`${config.base}/review`, {
            'ean': '0',
            'customer': customerNumber,
            'rating': 5
        }, headers).then(() => {
            console.log('\x1b[32m', '[PASS] Add Review: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Add Review: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};