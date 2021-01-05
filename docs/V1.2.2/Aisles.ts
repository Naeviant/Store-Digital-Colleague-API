/**
*	@api {post} /aisle/:code Create New Aisle
*	@apiVersion 1.2.2
*	@apiDescription Creates a new aisle at a site.
*	@apiName AddAisle
*	@apiGroup Aisles
*
*	@apiPermission Managers or Admins
*
*	@apiHeader {String} Authorization Authorization Token
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
*		    "description": "Aisle Number Already in Use",
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
*		// Returned when no site code is provided
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /aisle/:code/:aisle Get Aisle
*	@apiVersion 1.2.2
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
*			            "code": 1111
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
*	@apiVersion 1.2.2
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
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {patch} /aisle/:code/:aisle Update Aisle
*	@apiVersion 1.2.2
*	@apiDescription Updates an existing aisle at a site.
*	@apiName UpdateAisle
*	@apiGroup Aisles
*
*	@apiPermission Managers or Admins
*
*	@apiHeader {String} Authorization Authorization Token
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
*		    "description": "New Aisle Number Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the aisle number and site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code or Aisle Number Provided",
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
*	@api {delete} /aisle/:code/:aisle Delete Aisle
*	@apiVersion 1.2.2
*	@apiDescription Deletes an existing aisle from a site.
*	@apiName DeleteAisle
*	@apiGroup Aisles
*
*	@apiPermission Managers or Admins
*
*	@apiHeader {String} Authorization Authorization Token
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
*		    "description": "Invalid Site Code or Aisle Number Provided",
*		    "data": []
*		}
*/