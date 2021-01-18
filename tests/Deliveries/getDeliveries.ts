import { config } from '../../src/helpers/config';
import axios, { AxiosResponse } from 'axios';

export const getDeliveries = async (token: string, delivery: number) => {
	return new Promise<void>(async (resolve, reject) => {
		const headers = { headers: { 'Authorization': token }, timeout: 3000 };

		await axios.get(`${config.base}/delivery/${delivery}`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Delivery: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Delivery: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Delivery: Invalid Delivery Number', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Delivery: Invalid Delivery Number', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Delivery: Invalid Delivery Number', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Delivery: Invalid Delivery Number', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/inbound/-1`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Inbound Deliveries for Site: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Inbound Deliveries for Site: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/inbound/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Inbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Inbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Inbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Inbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/outbound/0`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Outbound Deliveries for Site: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Outbound Deliveries for Site: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/outbound/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Outbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Outbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Outbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Outbound Deliveries for Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/product/-1/0`, headers).then(() => {
			console.log('\x1b[32m', '[PASS] Get Product Deliveries for Site: Valid Request', '\x1b[0m');
		}).catch(() => {
			console.log('\x1b[31m', '[FAIL] Get Product Deliveries for Site: Valid Request', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/product/INVALID/0`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Product Deliveries for Site: Invalid Site Code', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Product Deliveries for Site: Invalid Site Code', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Product Deliveries for Site: Invalid Site Code', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Product Deliveries for Site: Invalid Site Code', '\x1b[0m');
		});

		await axios.get(`${config.base}/delivery/product/-1/INVALID`, headers).then(() => {
			console.log('\x1b[31m', '[FAIL] Get Product Deliveries for Site: Invalid EAN', '\x1b[0m');
		}).catch((error: Error & { response: { status: number } }) => {
			if (!error.response) console.log('\x1b[31m', '[FAIL] Get Product Deliveries for Site: Invalid EAN', '\x1b[0m');
			else if (error.response.status === 400) console.log('\x1b[32m', '[PASS] Get Product Deliveries for Site: Invalid EAN', '\x1b[0m');
			else console.log('\x1b[31m', '[FAIL] Get Product Deliveries for Site: Invalid EAN', '\x1b[0m');
		});

		resolve();
	});
};