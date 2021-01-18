import { config } from '../src/helpers/config';
import { makeConnection } from '../src/helpers/makeConnection';
import axios, { AxiosResponse } from 'axios';
import { hash } from 'bcrypt';
import { Counter, ICounter } from '../src/entities/Counter';
import { Site } from '../src/entities/Site';
import { User } from '../src/entities/User';
import { addProducts, getProducts, updateProducts, deleteProducts, getProductQuantities, setProductQuantities } from './Products';
import { addSites, getSites, updateSites, deleteSites } from './Sites';
import { addUsers, getUsers, authenticateUsers, updateUsers, deleteUsers } from './Users';
import { addAisles, getAisles, updateAisles, deleteAisles } from './Aisles';
import { addBays, getBays, updateBays, deleteBays } from './Bays';
import { addAssignments, getAssignments, deleteAssignments } from './Assignments';
import { addModules, getModules, updateModules, deleteModules, addModuleProducts, deleteModuleProducts } from './Modules';
import { addModuleInstances, getModuleInstances, deleteModuleInstances, addModuleBay, getModuleBay, deleteModuleBay } from './ModuleInstances';
import { addCustomers, getCustomers, updateCustomers, deleteCustomers } from './Customers';
import { addCollections, getCollections, updateCollections, deleteCollections } from './Collections';
import { addDeliveries, getDeliveries, updateDeliveries, deleteDeliveries } from './Deliveries';
import { addLogs, getLogs } from './AuditLogs';

async function main() {
	await makeConnection();

	const resp = await axios.get(`${config.base}`).then(async (response: AxiosResponse) => {
		if (response.data) {
			await Site.deleteOne({ code: 0 });
			await Site.deleteOne({ code: -1 });
			await User.deleteOne({ username: 'APITEST' });

			const customerCounter = await Counter.findOne({ _id: config.customerCounter }) as ICounter;
			const customerNumber = customerCounter.seq;

			const collectionCounter = await Counter.findOne({ _id: config.collectionCounter }) as ICounter;
			const collectionNumber = collectionCounter.seq;

			const deliveryCounter = await Counter.findOne({ _id: config.deliveryCounter }) as ICounter;
			const deliveryNumber = deliveryCounter.seq;

			const testSite = new Site({
				name: 'TESTSITE',
				code: 0,
				type: 'Store'
			});
			await testSite.save();

			const password = await hash('APITEST', 10);

			const testUser = new User({
				firstName: 'API',
				lastName: 'Test',
				username: 'APITEST',
				password: password,
				userType: 'Admin',
				site: testSite._id
			});
			await testUser.save();

			const resp = await axios.post(`${config.base}/authenticate`, {
				username: 'APITEST',
				password: 'APITEST'
			});

			const token = resp.data.data;

			console.log('\x1b[33m', '*** Tests Starting ***', '\x1b[0m');

			await addProducts(token);
			await addSites(token);
			await addUsers(token);
			await addAisles(token);
			await addBays(token);
			await addAssignments(token);
			await addModules(token);
			await addModuleProducts(token);
			await addModuleInstances(token);
			await addModuleBay(token);
			await addCustomers(token);
			await addCollections(token, customerNumber);
			await addDeliveries(token);
			await addLogs(token);

			await getProducts(token);
			await getSites(token);
			await getUsers(token);
			await authenticateUsers(token);
			await getAisles(token);
			await getBays(token);
			await getAssignments(token);
			await getModules(token);
			await getProductQuantities(token);
			await getModuleInstances(token);
			await getModuleBay(token);
			await getCustomers(token, customerNumber);
			await getCollections(token, customerNumber, collectionNumber);
			await getDeliveries(token, deliveryNumber);
			await getLogs(token);

			await updateProducts(token);
			await updateSites(token);
			await updateUsers(token);
			await updateAisles(token);
			await updateBays(token);
			await updateModules(token);
			await setProductQuantities(token);
			await updateCustomers(token, customerNumber);
			await updateCollections(token, collectionNumber);
			await updateDeliveries(token, deliveryNumber);

			await deleteDeliveries(token, deliveryNumber);
			await deleteCollections(token, collectionNumber);
			await deleteCustomers(token, customerNumber);
			await deleteModuleBay(token);
			await deleteModuleInstances(token);
			await deleteModuleProducts(token);
			await deleteModules(token);
			await deleteAssignments(token);
			await deleteBays(token);
			await deleteAisles(token);
			await deleteUsers(token);
			await deleteSites(token);
			await deleteProducts(token);

			console.log('\x1b[33m', '*** Tests Completed ***', '\x1b[0m');

			await testSite.remove();
			await testUser.remove();

			process.exit();
		}
		else {
			console.log('Cannot Run Tests: API Offline');
			process.exit();
		}

	}).catch((error) => {
		console.log('Cannot Run Tests: API Offline');
		process.exit();
	});
}

main();

