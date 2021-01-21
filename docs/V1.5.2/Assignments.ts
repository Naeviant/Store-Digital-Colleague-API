/**
*	@api {get} /assignment/product/:code/:ean Get Product Assignments
*	@apiVersion 1.5.2
*	@apiDescription Get all bays that a product is assigned to.
*	@apiName GetProductAssignments
*	@apiGroup Assignments
*
*	@apiPermission None
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
*		                        "name": "My Store",
*								"type": "Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Live",
*		                "_id": "5feb10d48f4743691ce3eb6e",
*		                "ean": "1234567890123",
*		                "name": "My Product",
*		                "price": 10,
*		                "description": "My Test Product",
*		                "ageRestricted": false,
*		                "info": [
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d85",
*		                        "name": "Weight",
*		                        "value": "1kg"
*		                    },
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d86",
*		                        "name": "Material",
*		                        "value": "Wood"
*		                    }
*		                ]
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
*		                        "name": "My Store",
*								"type": "Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Live",
*		                "_id": "5feb10d48f4743691ce3eb6e",
*		                "ean": "1234567890123",
*		                "name": "My Product",
*		                "price": 10,
*		                "description": "My Test Product",
*		                "ageRestricted": false,
*		                "info": [
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d85",
*		                        "name": "Weight",
*		                        "value": "1kg"
*		                    },
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d86",
*		                        "name": "Material",
*		                        "value": "Wood"
*		                    }
*		                ]
*		            },
*		            "type": "Multi-Location"
*		        },
*				...
*		    ]
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no assignments are found
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "No Assignments Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /assignment/location/:code/:aisle/:bay/:type Get Location Assignments
*	@apiVersion 1.5.2
*	@apiDescription Get all products that are assigned to a bay.
*	@apiName GetLocationAssignments
*	@apiGroup Assignments
*
*	@apiPermission None
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
*		                        "name": "My Store",
*								"type": "Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Live",
*		                "_id": "5feb10d48f4743691ce3eb6e",
*		                "ean": "1234567890123",
*		                "name": "My Product",
*		                "price": 10,
*		                "description": "My Test Product",
*		                "ageRestricted": false,
*		                "info": [
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d85",
*		                        "name": "Weight",
*		                        "value": "1kg"
*		                    },
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d86",
*		                        "name": "Material",
*		                        "value": "Wood"
*		                    }
*		                ]
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
*		                        "name": "My Store",
*								"type": "Store"
*		                    }
*		                }
*		            },
*		            "product": {
*		                "status": "Live",
*		                "_id": "5feb10d48f4743691ce3eb6e",
*		                "ean": "1234567890124",
*		                "name": "My Other Product",
*		                "price": 12.5,
*		                "description": "My Other Test Product",
*		                "ageRestricted": true,
*		                "info": [
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d89",
*		                        "name": "Weight",
*		                        "value": "2kg"
*		                    },
*		                    {
*		                        "_id": "5fe748cf43ac916074cb0d90",
*		                        "name": "Material",
*		                        "value": "Metal"
*		                    }
*		                ]
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
*		    "description": "Invalid Site Code, Aisle Number, Bay Number or Assignment Type Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no assignments are found
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "No Assignments Found",
*		    "data": []
*		}
*/