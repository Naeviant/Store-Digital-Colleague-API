import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getModuleInstances = async (token: string) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/module/site/A`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Module Instances: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Module Instances: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Module Instances: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Module Instances: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/module/site/-1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Module Instances: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Module Instances: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/module/site/-1/INVALID`, headers).then((resp) => {
			console.log('\x1b[31m', '[FAIL] Get Module Instance: Invalid Module Discriminator', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Module Instance: Invalid Module Discriminator', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Module Instance: Invalid Module Discriminator', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Module Instance: Invalid Module Discriminator', '\x1b[0m');
		});

		await axios.get(`${config.base}/module/site/A/APIMODULE`, headers).then((resp) => {
			console.log('\x1b[31m', '[FAIL] Get Module Instance: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Module Instance: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Module Instance: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Module Instance: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/module/site/-1/APIMODULE`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Module Instance: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Module Instance: Valid Request', '\x1b[0m');
		});

		resolve();
	});
};