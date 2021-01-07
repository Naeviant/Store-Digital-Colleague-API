/**
*	@api {get} /bay/:code/:aisle/:bay Get Bay
*	@apiVersion 1.4.0
*	@apiDescription Gets an existing bay in an aisle.
*	@apiName GetBay
*	@apiGroup Bays
*
*	@apiPermission None
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
*		                "name": "My Store",
*						"type": "Store"
*		            }
*		        }
*		    }
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no bay has the provided bay number
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Bay Not Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /bay/:code/:aisle Get All Bays in an Aisle
*	@apiVersion 1.4.0
*	@apiDescription Gets all existing bays in an aisle.
*	@apiName GetBays
*	@apiGroup Bays
*
*	@apiPermission None

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
*			                "name": "My Store",
*							"type": "Store"
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
*			                "name": "My Store",
*							"type": "Store"
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
*		    "description": "Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/