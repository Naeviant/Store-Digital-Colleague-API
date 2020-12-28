import { Router } from 'express';
import * as moduleController from '../controllers/moduleController';
import { isAdmin } from '../middleware/auth';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/module')
	.post(isAdmin, moduleController.addModule)
	.get(moduleController.getAllModules)
	.all(generate405);
router.route('/module/:discriminator')
	.post(isAdmin, moduleController.addModuleProduct)
	.get(moduleController.getModule)
	.patch(moduleController.updateModule)
	.delete(isAdmin, moduleController.deleteModule)
	.all(generate405);
router.route('/module/:discriminator/:sequence')
	.delete(isAdmin, moduleController.deleteModuleProduct)
	.all(generate405);

export const moduleRoutes = router;

/**
*	@api {post} /module Create New Module
*	@apiVersion 1.1.0
*	@apiDescription Creates a new module.
*	@apiName AddModule
*	@apiGroup Modules
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (Body Parameters) {String} discriminator Unique Identifier for Module (No Spaces Allowed) 
*	@apiParam (Body Parameters) {String} name Name of Module
*	@apiParam (Body Parameters) {Date} startDate Start Date of Module (Format: YYYY-MM-DD)
*	@apiParam (Body Parameters) {Date} endDate End Date of Module (Format: YYYY-MM-DD)
*
*	@apiParamExample {json} Request Example:
*		POST /module
*		{
*			"discriminator": "FIRSTMODULE",
*			"name": "My Module",
*			"startDate": "2020-01-01",
*			"endDate": "2020-12-31"
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Module Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when provided discriminator is already used for another module
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Add Module: Discriminator Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Module: Invalid Request Body",
*		    "data": []
*		}
*/

/**
*	@api {get} /module/:discriminator Get Module
*	@apiVersion 1.1.0
*	@apiDescription Gets an existing module.
*	@apiName GetModule
*	@apiGroup Modules
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} discriminator Unique Identifier for Module (No Spaces Allowed) 
*
*	@apiParamExample {json} Request Example:
*		GET /module/FIRSTMODULE
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Module Retrieved Successfully",
*		    "data": {
*				"_id": "5fe9bb19df6009646cdd6152",
*	            "discriminator": "MYMODULE",
*	            "name": "First Module",
*	            "parts": [...],
*				"startDate": "2020-01-01",
*				"endDate": "2020-12-31"
*		    }
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when no discriminator is provided
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Module: Invalid Discriminator Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no module has the provided discriminator
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Module: Module Not Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /module Get All Modules
*	@apiVersion 1.1.0
*	@apiDescription Gets all existing modules.
*	@apiName GetModules
*	@apiGroup Modules
*
*	@apiPermission None
*
*	@apiParamExample {json} Request Example:
*		GET /module
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Modules Retrieved Successfully",
*		    "data": [
*				{
*		            "discriminator": "MYMODULE",
*		            "name": "First Module",
*		            "parts": [...],
*					"startDate": "2020-01-01",
*					"endDate": "2020-12-31"
*			    },
*				{
*		            "discriminator": "MYOTHERMODULE",
*		            "name": "Second Module",
*		            "parts": [...],
*					"startDate": "2020-01-01",
*					"endDate": "2020-12-31"
*			    },
*				...
*		    ]
*		}
*/

/**
*	@api {patch} /module/:discriminator Update Module
*	@apiVersion 1.1.0
*	@apiDescription Updates an existing module.
*	@apiName UpdateModule
*	@apiGroup Modules
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String}	discriminator Unique Identifier for Module (No Spaces Allowed) 
*	@apiParam (Body Parameters) {String} [name] Name of Module 
*	@apiParam (Body Parameters) {Date} startDate Start Date of Module (Format: YYYY-MM-DD)
*	@apiParam (Body Parameters) {Date} endDate End Date of Module (Format: YYYY-MM-DD)
*
*	@apiParamExample {json} Request Example:
*		PATCH /module/MYMODULE
*		{
*			"name": "Second Module",
*			"startDate": "2020-01-01",
*			"endDate": "2020-12-31"
*		}
*
*	@apiSuccessExample {json} Success Example 1:
*		// Returned when a module is updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Module Updated Successfully",
*		    "data": []
*		}
*	@apiSuccessExample {json} Success Example 2:
*		// Returned when a no modules are updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "No Changes Required",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when an invalid or empty request body is sent
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Update Module: Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no discriminator is provided or no module has the provided discriminator
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Update Module: Invalid Discriminator Provided",
*		    "data": []
*		}
*/

/**
*	@api {delete} /module/:discriminator Delete Module
*	@apiVersion 1.1.0
*	@apiDescription Deletes an existing module.
*	@apiName DeleteModule
*	@apiGroup Modules
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} discriminator Unique Identifier for Module (No Spaces Allowed) 
*
*	@apiParamExample {json} Request Example:
*		DELETE /module/MYMODULE
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Module Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no discriminator is provided or no module has the provided discriminator
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Delete Module: Invalid Discriminator Provided",
*		    "data": []
*		}
*/

/**
*	@api {post} /module/:discriminator Add Product to Module
*	@apiVersion 1.1.0
*	@apiDescription Adds an existing product to an existing module.
*	@apiName AddModuleProduct
*	@apiGroup Modules
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} discriminator Unique Identifier for Module (No Spaces Allowed) 
*	@apiParam (Body Parameters) {String} ean EAN/Barcode of Product
*	@apiParam (Body Parameters) {Number} facings Number of Facings of Product in Module
*	@apiParam (Body Parameters) {Number} [seqeunce] Sequence of Product in Module (Defaults to End of Module)
*
*	@apiParamExample {json} Request Example:
*		POST /module/FIRSTMODULE
*		{
*			"ean": "1234567890123",
*			"facings": 2,
*			"sequence": 2
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Added to Module Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when no discriminator is provided or no module has the provided discriminator
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Product to Module: Invalid Discriminator Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Product to Module: Invalid Request Body",
*		    "data": []
*		}
*/

/**
*	@api {delete} /module/:discriminator/:sequence Delete Product from Module
*	@apiVersion 1.1.0
*	@apiDescription Deletes an existing product from an existing module.
*	@apiName DeleteModuleProduct
*	@apiGroup Modules
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} discriminator Unique Identifier for Module (No Spaces Allowed) 
*	@apiParam (URL Parameters) {number} sequence Sequence Number of Product in Module
*
*	@apiParamExample {json} Request Example:
*		DELETE /module/MYMODULE/2
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Deleted from Module Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when no discriminator is provided or no module has the provided discriminator
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Delete Module: Invalid Discriminator Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no sequence number is provided or no product in the module has the provided sequence number
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Delete Module: Invalid Sequence Provided",
*		    "data": []
*		}
*/