import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getReviews = async (token: string, customerNumber: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };
        
        await axios.get(`${config.base}/review/customer/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Customer Reviews: Invalid Customer Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Customer Reviews: Invalid Customer Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Customer Reviews: Invalid Customer Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Customer Reviews: Invalid Customer Number', '\x1b[0m');
        });

        await axios.get(`${config.base}/review/customer/${customerNumber}`, headers).then(() => {
            console.log('\x1b[32m', '[PASS] Get Customer Reviews: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Get Customer Reviews: Valid Request', '\x1b[0m');
        });
        
        await axios.get(`${config.base}/review/product/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Product Reviews: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Product Reviews: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Product Reviews: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Product Reviews: Invalid EAN', '\x1b[0m');
        });

        await axios.get(`${config.base}/review/product/0`, headers).then(() => {
            console.log('\x1b[32m', '[PASS] Get Product Reviews: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Get Product Reviews: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};