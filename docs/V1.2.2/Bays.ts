/**
*	@api {post} /bay/:code/:aisle Create New Bay
*	@apiVersion 1.2.2
*	@apiDescription Creates a new bay on an aisle.
*	@apiName AddBay
*	@apiGroup Bays
*
*	@apiPermission Managers or Admins
*
*	@apiHeader {String} Authorization Authorization Token
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
*		    "description": "Aisle Bay Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
*		// Returned when the aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /bay/:code/:aisle/:bay Get Bay
*	@apiVersion 1.2.2
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
*		                "name": "My Store"
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
*	@apiVersion 1.2.2
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
*		    "description": "Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {patch} /bay/:code/:aisle/:bay Update Bay
*	@apiVersion 1.2.2
*	@apiDescription Updates an existing bay in an aisle.
*	@apiName UpdateBay
*	@apiGroup Bays
*
*	@apiPermission Managers or Admins
*
*	@apiHeader {String} Authorization Authorization Token
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
*		    "description": "New Bay Number Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the bay number, aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code, Aisle Number or Bay Number Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
*		// Returned when the request body is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Request Body",
*		    "data": []
*		}
*/

/**
*	@api {delete} /bay/:code/:aisle/:bay Delete Bay
*	@apiVersion 1.2.2
*	@apiDescription Deletes an existing bay from an aisle.
*	@apiName DeleteBay
*	@apiGroup Bays
*
*	@apiPermission Managers or Admins
*
*	@apiHeader {String} Authorization Authorization Token
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
*		    "description": "Invalid Site Code, Aisle Number or Bay Number Provided",
*		    "data": []
*		}
*/