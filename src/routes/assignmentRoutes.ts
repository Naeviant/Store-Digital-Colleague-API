import { Router } from 'express';
import * as assignmentController from '../controllers/assignmentController';
import { generate405 } from '../helpers/httpErrors';

const router = Router();

router.route('/assignment/location/:code/:aisle/:bay/:type')
	.get(assignmentController.getAssignmentsByLocation)
	.all(generate405);
router.route('/assignment/product/:code/:ean')
	.get(assignmentController.getAssignmentsByProduct)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay/:type/:ean')
	.delete(assignmentController.deleteAssignment)
	.all(generate405);
router.route('/assignment/:code/:aisle/:bay')
	.post(assignmentController.addAssignment)
	.all(generate405);

export const assignmentRoutes = router;

/**
*	@api {post} /assignment/:code/:aisle/:bay Create New Assignment
*	@apiVersion 1.0.0
*	@apiDescription Assigns a product to a bay.
*	@apiName AddAssignment
*	@apiGroup Assignments
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*	@apiParam (URL Parameters) {Number} aisle Aisle Number
*	@apiParam (URL Parameters) {Number} bay Bay Number
*	@apiParam (Body Parameters) {String} ean EAN/Barcode of Product 
*	@apiParam (Body Parameters) {String="Multi-Location","Clearance","Display","Overstock","Topstock","Stockroom"} type Type of Assignment
*
*	@apiParamExample {json} Request Example:
*		POST /assignment/1111/1/1
*		{
*			"type": "Multi-Location",
*			"ean": "1234567890123"
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Assignment Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the bay does not accept the specified assignment type
*		HTTP/1.1 422 Unprocessable Entity
*		{
*		    "code": 422,
*		    "status": "Unprocessable Entity",
*		    "description": "Cannot Add Assignment: Location Does Not Accept Assignment Type",
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
*	@apiErrorExample {json} Error Example 3:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Site: Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 4:
*		// Returned when the provided EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Site: Invalid EAN Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /assignment/product/:code/:ean Get Product Assignments
*	@apiVersion 1.0.0
*	@apiDescription Get all bays that a product is assigned to.
*	@apiName GetProductAssignments
*	@apiGroup Assignments
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*	@apiParam (URL Parameters) {String} ean EAN/Barcode of Product
*
*	@apiParamExample {json} Request Example:
*		GET /assignment/product/1111/1234567890123
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Assignments Retrieved Successfully",
*		    "data": [
*		        {
*		            "bay": {
*		                "moduleLimit": 1,
*		                "bay": 1,
*		                "allowsMultiLocation": true,
*		                "allowsClearance": false,
*		                "allowsDisplay": false,
*		                "allowsOverstock": true,
*		                "allowsTopstock": false,
*		                "allowsStockroom": false,
*		                "aisle": {
*		                    "name": "Food",
*		                    "aisle": 1,
*		                    "site": {
*		                        "code": 1111,
*		                        "name": "My Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Live",
*		                "name": "My Product",
*		                "price": 10,
*		                "ean": "1234567890123"
*		            },
*		            "type": "Multi-Location"
*		        },
*		       	{
*		            "bay": {
*		                "moduleLimit": 1,
*		                "bay": 2,
*		                "allowsMultiLocation": true,
*		                "allowsClearance": false,
*		                "allowsDisplay": false,
*		                "allowsOverstock": true,
*		                "allowsTopstock": false,
*		                "allowsStockroom": false,
*		                "aisle": {
*		                    "name": "Food",
*		                    "aisle": 1,
*		                    "site": {
*		                        "code": 1111,
*		                        "name": "My Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Live",
*		                "name": "My Product",
*		                "price": 10,
*		                "ean": "1234567890123"
*		            },
*		            "type": "Multi-Location"
*		        },
*				...
*		    ]
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the site code and EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Assignments: Invalid Site Code or EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Assignments: Invalid EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
*		// Returned when no assignments are found
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Assignments: No Assignments Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /assignment/location/:code/:aisle/:bay/:type Get Location Assignments
*	@apiVersion 1.0.0
*	@apiDescription Get all products that are assigned to a bay.
*	@apiName GetLocationAssignments
*	@apiGroup Assignments
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*	@apiParam (URL Parameters) {Number} aisle Aisle Number
*	@apiParam (URL Parameters) {Number} bay Bay Number
*	@apiParam (URL Parameters) {String="Multi-Location","Clearance","Display","Overstock","Topstock","Stockroom"} type Type of Assignment
*
*	@apiParamExample {json} Request Example:
*		GET /assignment/location/1111/1/1/Multi-Location
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Assignments Retrieved Successfully",
*		    "data": [
*		        {
*		            "bay": {
*		                "moduleLimit": 1,
*		                "bay": 1,
*		                "allowsMultiLocation": true,
*		                "allowsClearance": false,
*		                "allowsDisplay": false,
*		                "allowsOverstock": true,
*		                "allowsTopstock": false,
*		                "allowsStockroom": false,
*		                "aisle": {
*		                    "name": "Food",
*		                    "aisle": 1,
*		                    "site": {
*		                        "code": 1111,
*		                        "name": "My Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Live",
*		                "name": "My Product",
*		                "price": 10,
*		                "ean": "1234567890123"
*		            },
*		            "type": "Multi-Location"
*		        },
*		        {
*		            "bay": {
*		                "moduleLimit": 1,
*		                "bay": 1,
*		                "allowsMultiLocation": true,
*		                "allowsClearance": false,
*		                "allowsDisplay": false,
*		                "allowsOverstock": true,
*		                "allowsTopstock": false,
*		                "allowsStockroom": false,
*		                "aisle": {
*		                    "name": "Food",
*		                    "aisle": 1,
*		                    "site": {
*		                        "code": 1111,
*		                        "name": "My Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Discontinued",
*		                "name": "My Other Product",
*		                "price": 12.5,
*		                "ean": "1234567890124"
*		            },
*		            "type": "Multi-Location"
*		        },
*				...
*		    ]
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the site code, bay number, aisle number or assignment type is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Assignments: Invalid Site Code, Aisle Number, Bay Number or Assignment Type Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no assignments are found
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Assignments: No Assignments Found",
*		    "data": []
*		}
*/

/**
*	@api {delete} /assignment/location/:code/:aisle/:bay/:type/:ean Delete Assignment
*	@apiVersion 1.0.0
*	@apiDescription Unassign a product from a bay.
*	@apiName DeleteAssignment
*	@apiGroup Assignments
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*	@apiParam (URL Parameters) {Number} aisle Aisle Number
*	@apiParam (URL Parameters) {Number} bay Bay Number
*	@apiParam (URL Parameters) {String="Multi-Location","Clearance","Display","Overstock","Topstock","Stockroom"} type Type of Assignment
*	@apiParam (URL Parameters) {String} ean EAN/Barcode of Product
*
*	@apiParamExample {json} Request Example:
*		DELETE /assignment/location/1111/1/1/Multi-Location/1234567890123
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Assignment Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the site code, aisle number, bay number, assignment type and EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Unassign Product: Invalid Site Code, Aisle Number, Bay Number, Assignment Type or EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Unassign Product: Invalid EAN Provided",
*		    "data": []
*		}
*/