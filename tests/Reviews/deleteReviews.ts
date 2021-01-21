import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const deleteReviews = async (token: string, customerNumber: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };
        
        await axios.delete(`${config.base}/review/${customerNumber}/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Review: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Review: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Review: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Review: Invalid EAN', '\x1b[0m');
        });
        
        await axios.delete(`${config.base}/review/A/0`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Review: Invalid Customer Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Review: Invalid Customer Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Review: Invalid Customer Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Review: Invalid Customer Number', '\x1b[0m');
        });
        
        await axios.delete(`${config.base}/review/${customerNumber}/0`, headers).then(() => {
            console.log('\x1b[32m', '[PASS] Delete Review: Valid Request', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			console.log('\x1b[31m', '[FAIL] Delete Review: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};