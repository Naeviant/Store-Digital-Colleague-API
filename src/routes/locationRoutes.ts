import { Router } from 'express';
import * as locationController from '../controllers/locationController';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/aisle/:code')
	.post(locationController.addAisle)
	.get(locationController.getAllAislesAtSite)
	.all(generate405);
router.route('/aisle/:code/:aisle')
	.get(locationController.getAisle)
	.patch(locationController.updateAisle)
	.delete(locationController.deleteAisle)
	.all(generate405);

router.route('/bay/:code/:aisle')
	.post(locationController.addBay)
	.get(locationController.getAllBaysInAisle)
	.all(generate405);
router.route('/bay/:code/:aisle/:bay')
	.get(locationController.getBay)
	.patch(locationController.updateBay)
	.delete(locationController.deleteBay)
	.all(generate405);

export const locationRoutes = router;

/**
*	@api {post} /aisle/:code Create New Aisle
*	@apiVersion 1.0.0
*	@apiDescription Creates a new aisle at a site.
*	@apiName AddAisle
*	@apiGroup Aisles
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*	@apiParam (Body Parameters) {String} name General Contents of Aisle
*	@apiParam (Body Parameters)	{Number} aisle Aisle Number
*
*	@apiParamExample {json} Request Example:
*		POST /aisle/1111
*		{
*			"name": "Food",
*			"aisle": 1
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Aisle Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when provided aisle number is already used for another aisle
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Add Aisle: Aisle Number Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Aisle: Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
*		// Returned when no site code is provided
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Aisle: Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /aisle/:code/:aisle Get Aisle
*	@apiVersion 1.0.0
*	@apiDescription Gets an existing aisle at a site.
*	@apiName GetAisle
*	@apiGroup Aisles
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Aisle Number 
*
*	@apiParamExample {json} Request Example:
*		GET /aisle/1111/1
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Aisle Retrieved Successfully",
*		        "data": {
*			        "_id": "5fe7482d43ac916074cb0d82",
*			        "name": "Food",
*			        "aisle": 1,
*			        "site": {
*			            "_id": "5fe7481543ac916074cb0d81",
*			            "name": "My Store",
*			            "code": 1111
*			        }
*			    }
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Aisle: Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no aisle has the provided aisle number
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Aisle: Aisle Not Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /aisle/:code Get All Aisles
*	@apiVersion 1.0.0
*	@apiDescription Gets all existing aisles at a site.
*	@apiName GetAisles
*	@apiGroup Aisles
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /aisle/1111
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Aisles Retrieved Successfully",
*		    "data": [
*				{
*			        "name": "Food",
*			        "aisle": 1,
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111
*					}
*		        },
*				{
*			        "name": "Drinks",
*			        "aisle": 2,
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111
*					}
*		        },
*				...
*		    ]
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the site code is missing or invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Aisles: Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {patch} /aisle/:code/:aisle Update Aisle
*	@apiVersion 1.0.0
*	@apiDescription Updates an existing aisle at a site.
*	@apiName UpdateAisle
*	@apiGroup Aisles
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Existing Aisle Number 
*	@apiParam (Body Parameters) {String} [name] General Contents of Aisle
*	@apiParam (Body Parameters)	{Number} [aisle] New Aisle Number
*
*	@apiParamExample {json} Request Example:
*		PATCH /aisle/1111/1
*		{
*			"name": "Drinks",
*			"aisle": 2
*		}
*
*	@apiSuccessExample {json} Success Example 1:
*		// Returned when an aisle is updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Aisle Updated Successfully",
*		    "data": []
*		}
*	@apiSuccessExample {json} Success Example 2:
*		// Returned when a no aisles are updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "No Changes Required",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when new aisle number is already used for another aisle
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Update Aisle: New Aisle Number Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Update Aisle: Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {delete} /aisle/:code/:aisle Delete Aisle
*	@apiVersion 1.0.0
*	@apiDescription Deletes an existing aisle from a site.
*	@apiName DeleteAisle
*	@apiGroup Aisles
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Aisle Number 
*
*	@apiParamExample {json} Request Example:
*		DELETE /aisle/1111/1
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Aisle Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Delete Aisle: Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {post} /bay/:code/:aisle Create New Bay
*	@apiVersion 1.0.0
*	@apiDescription Creates a new bay on an aisle.
*	@apiName AddBay
*	@apiGroup Bays
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*	@apiParam (URL Parameters) {Number} aisle Aisle Number
*	@apiParam (Body Parameters) {Number} bay Bay Number
*	@apiParam (Body Parameters) {Number} moduleLimit Number of Modules Allowed in Bay
*	@apiParam (Body Parameters) {Boolean} allowsMultiLocation Whether or Not Bay Accepts Mutli-Locations
*	@apiParam (Body Parameters) {Boolean} allowsClearance Whether or Not Bay Accepts Clearance
*	@apiParam (Body Parameters) {Boolean} allowsDisplay Whether or Not Bay Accepts Displays
*	@apiParam (Body Parameters) {Boolean} allowsOverstock Whether or Not Bay Accepts Overstock
*	@apiParam (Body Parameters) {Boolean} allowsTopstock Whether or Not Bay Accepts Topstock
*	@apiParam (Body Parameters) {Boolean} allowsStockroom Whether or Not Bay is a Stockroom
*
*	@apiParamExample {json} Request Example:
*		POST /bay/1111/1
*		{
*			"bay": 1,
*			"moduleLimit": 1,
*			"allowsMultiLocation": true,
*			"allowsClearance": false,
*			"allowsDisplay": false,
*			"allowsOverstock": true,
*			"allowsTopstock": false,
*			"allowsStockroom": false
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Bay Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when provided bay number is already used for another bay in the aisle
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Add Bay: Aisle Bay Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Bay: Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
*		// Returned when the aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Bay: Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /bay/:code/:aisle/:bay Get Bay
*	@apiVersion 1.0.0
*	@apiDescription Gets an existing bay in an aisle.
*	@apiName GetBay
*	@apiGroup Bays
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Aisle Number 
*	@apiParam (URL Parameters) {Number} bay Bay Number 
*
*	@apiParamExample {json} Request Example:
*		GET /bay/1111/1/1
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Bay Retrieved Successfully",
*	        "data": {
*		        "_id": "5fe7807a0c519319c402342c",
*		        "moduleLimit": 1,
*		        "bay": 1,
*		        "allowsMultiLocation": true,
*		        "allowsClearance": false,
*		        "allowsDisplay": false,
*		        "allowsOverstock": true,
*		        "allowsTopstock": false,
*		        "allowsStockroom": false,
*		        "aisle": {
*		            "_id": "5fe7758138a37545e8f6298d",
*		            "name": "Food",
*		            "aisle": 1,
*		            "site": {
*		                "_id": "5fe7755038a37545e8f6298c",
*		                "code": 1111,
*		                "name": "My Store"
*		            }
*		        }
*		    }
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the aisle number, bay number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Bay: Invalid Site Code, Aisle Number or Bay Number Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no bay has the provided bay number
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Bay: Bay Not Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /bay/:code/:aisle Get All Bays in an Aisle
*	@apiVersion 1.0.0
*	@apiDescription Gets all existing bays in an aisle.
*	@apiName GetBays
*	@apiGroup Bays

*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Aisle Number
*
*	@apiParamExample {json} Request Example:
*		GET /bay/1111/1
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Bays Retrieved Successfully",
*		    "data": [
*				{
*			        "moduleLimit": 1,
*			        "bay": 1,
*		    	    "allowsMultiLocation": true,
*			        "allowsClearance": false,
*			        "allowsDisplay": false,
*			        "allowsOverstock": true,
*			        "allowsTopstock": false,
*			        "allowsStockroom": false,
*			        "aisle": {
*			            "name": "Food",
*			            "aisle": 1,
*			            "site": {
*			                "code": 1111,
*			                "name": "My Store"
*			            }
*			        }
*			    },
*				{
*			        "moduleLimit": 1,
*			        "bay": 2,
*		    	    "allowsMultiLocation": true,
*			        "allowsClearance": false,
*			        "allowsDisplay": false,
*			        "allowsOverstock": true,
*			        "allowsTopstock": false,
*			        "allowsStockroom": false,
*			        "aisle": {
*			            "name": "Food",
*			            "aisle": 1,
*			            "site": {
*			                "code": 1111,
*			                "name": "My Store"
*			            }
*			        }
*			    },
*				...
*		    ]
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the site code and aisle number is missing or invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Bays: Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {patch} /bay/:code/:aisle/:bay Update Bay
*	@apiVersion 1.0.0
*	@apiDescription Updates an existing bay in an aisle.
*	@apiName UpdateBay
*	@apiGroup Bays
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Existing Aisle Number 
*	@apiParam (Body Parameters) {Number} [bay] Bay Number
*	@apiParam (Body Parameters) {Number} [moduleLimit] Number of Modules Allowed in Bay
*	@apiParam (Body Parameters) {Boolean} [allowsMultiLocation] Whether or Not Bay Accepts Mutli-Locations
*	@apiParam (Body Parameters) {Boolean} [allowsClearance] Whether or Not Bay Accepts Clearance
*	@apiParam (Body Parameters) {Boolean} [allowsDisplay] Whether or Not Bay Accepts Displays
*	@apiParam (Body Parameters) {Boolean} [allowsOverstock] Whether or Not Bay Accepts Overstock
*	@apiParam (Body Parameters) {Boolean} [allowsTopstock] Whether or Not Bay Accepts Topstock
*	@apiParam (Body Parameters) {Boolean} [allowsStockroom] Whether or Not Bay is a Stockroom
*
*	@apiParamExample {json} Request Example:
*		PATCH /bay/1111/1/1
*		{
*			"moduleLimit": 0,
*			"allowsMultiLocation": false,
*			"allowsClearance": true,
*			"allowsOverstock": false
*		}
*
*	@apiSuccessExample {json} Success Example 1:
*		// Returned when a bay is updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Bay Updated Successfully",
*		    "data": []
*		}
*	@apiSuccessExample {json} Success Example 2:
*		// Returned when a no bays are updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "No Changes Required",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when new bay number is already used for another bay
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Update Bay: New Bay Number Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the bay number, aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Update Bay: Invalid Site Code, Aisle Number or Bay Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {delete} /bay/:code/:aisle/:bay Delete Bay
*	@apiVersion 1.0.0
*	@apiDescription Deletes an existing bay from an aisle.
*	@apiName DeleteBay
*	@apiGroup Bays
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Aisle Number 
*	@apiParam (URL Parameters) {Number} bay Bay Number 
*
*	@apiParamExample {json} Request Example:
*		DELETE /bay/1111/1/1
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Bay Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the bay number, aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Delete Bay: Invalid Site Code, Aisle Number or Bay Number Provided",
*		    "data": []
*		}
*/