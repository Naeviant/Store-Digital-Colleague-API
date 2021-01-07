/**
*	@api {post} /site Create New Site
*	@apiVersion 1.4.0
*	@apiDescription Creates a new site.
*	@apiName AddSite
*	@apiGroup Sites
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (Body Parameters) {String} name Name of Site 
*	@apiParam (Body Parameters) {Number{4}} code ID Code of Site
*	@apiParam (Body Parameters) {String="Store","Supplier","Distribution Centre"} type Type of Site
*
*	@apiParamExample {json} Request Example:
*		POST /site
*		{
*			"name": "My Store",
*			"code": 1111,
*			"type": "Store"
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Site Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when provided site code is already used for another site
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Site Code Already in Use",
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
*/

/**
*	@api {get} /site/:code Get Site
*	@apiVersion 1.4.0
*	@apiDescription Gets an existing site.
*	@apiName GetSite
*	@apiGroup Sites
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /site/1111
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Site Retrieved Successfully",
*		    "data": {
*				"_id": "5fe7481543ac916074cb0d81",
*				"name": "My Store",
*				"code": 1111,
*				"type": "Store"		        
*		    }
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no site has the provided code
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Site Code Not Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /site Get All Sites
*	@apiVersion 1.4.0
*	@apiDescription Gets all existing sites.
*	@apiName GetSites
*	@apiGroup Sites
*
*	@apiPermission None
*
*	@apiParamExample {json} Request Example:
*		GET /site
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Sites Retrieved Successfully",
*		    "data": [
*		        {
*					"name": "My Store",
*					"code": 1111,
*					"type": "Store"
*		        },
*		        {
*					"name": "My Other Store",
*					"code": 1112,
*					"type": "Store"
*		        },
*				...
*		    ]
*		}
*/

/**
*	@api {patch} /site/:code Update Site
*	@apiVersion 1.4.0
*	@apiDescription Updates an existing site.
*	@apiName UpdateSite
*	@apiGroup Sites
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String}	code ID Code of Site
*	@apiParam (Body Parameters) {String} [name] Name of Site 
*	@apiParam (Body Parameters) {String="Store","Supplier","Distribution Centre"} [type] Type of Site
*
*	@apiParamExample {json} Request Example:
*		PATCH /site/1111
*		{
*			"name": "My Updated Store"
*		}
*
*	@apiSuccessExample {json} Success Example 1:
*		// Returned when a site is updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Site Added Successfully",
*		    "data": []
*		}
*	@apiSuccessExample {json} Success Example 2:
*		// Returned when a no sites are updated
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
*		    "description": "Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no site code is provided or no site has the provided code
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/