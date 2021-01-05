import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const deleteAisles = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.delete(`${config.base}/aisle/-1/A`, headers).then((resp) => {
			console.log('\x1b[31m', '[FAIL] Delete Aisle: Invalid Aisle Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Aisle: Invalid Aisle Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Aisle: Invalid Aisle Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Aisle: Invalid Aisle Number', '\x1b[0m');
		});

		await axios.delete(`${config.base}/aisle/A/1`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Aisle: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Aisle: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Aisle: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Aisle: Invalid Site Code', '\x1b[0m');
		});

		await axios.delete(`${config.base}/aisle/-1/1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Delete Aisle: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Delete Aisle: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};