/**
*	@api {get} /aisle/:code/:aisle Get Aisle
*	@apiVersion 1.4.0
*	@apiDescription Gets an existing aisle at a site.
*	@apiName GetAisle
*	@apiGroup Aisles
*
*	@apiPermission None
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
*			            "code": 1111,
*						"type": "Store"
*			        }
*			    }
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no aisle has the provided aisle number
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Aisle Not Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /aisle/:code Get All Aisles
*	@apiVersion 1.4.0
*	@apiDescription Gets all existing aisles at a site.
*	@apiName GetAisles
*	@apiGroup Aisles
*
*	@apiPermission None
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
*			            "code": 1111,
*						"type": "Store"
*					}
*		        },
*				{
*			        "name": "Drinks",
*			        "aisle": 2,
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
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
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/