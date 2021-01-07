import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const updateDeliveries = async (token: string, delivery: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.patch(`${config.base}/delivery/${delivery}`, {
		    'status': 'In Transit'
		}, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Update Delivery: Valid Request', '\x1b[0m');
		}).catch((error) => {
			console.log('\x1b[31m', '[FAIL] Update Delivery: Valid Request', '\x1b[0m');
		});

		await axios.patch(`${config.base}/delivery/INVALID`, {
		    'status': 'In Transit'
		}, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Update Delivery: Invalid Delivery Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Update Delivery: Invalid Delivery Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Update Delivery: Invalid Delivery Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Update Delivery: Invalid Delivery Number', '\x1b[0m');
		});

		resolve();
	});
};