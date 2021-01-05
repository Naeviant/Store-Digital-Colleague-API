import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getModules = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/module`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Modules: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Modules: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/module/-`, headers).then((resp) => {
			console.log('\x1b[31m', '[FAIL] Get Module: Invalid Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Module: Invalid Module Discriminator', '\x1b[0m');
			else if (error.response.status === 404) console.log('\x1b[32m', '[PASS] Get Module: Invalid Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Module: Invalid Module Discriminator', '\x1b[0m');
		});

		await axios.get(`${config.base}/module/APIMODULE`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Module: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Module: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};