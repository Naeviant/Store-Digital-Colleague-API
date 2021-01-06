import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const deleteCollections = async (token: string, collection: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.delete(`${config.base}/collection/${collection}`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Delete Collection: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Delete Collection: Valid Request', '\x1b[0m');
		});

		await axios.delete(`${config.base}/collection/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Delete Collection: Invalid Collection Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Delete Collection: Invalid Collection Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Delete Collection: Invalid Collection Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Delete Collection: Invalid Customer Number', '\x1b[0m');
		});

		resolve();
	});
};