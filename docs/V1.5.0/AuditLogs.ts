/**
*	@api {post} /audit/:code/ Log New Action
*	@apiVersion 1.5.0
*	@apiDescription Logs an action.
*	@apiName AddLog
*	@apiGroup Audit Logs
*
*	@apiPermission Any Authenticated Users
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*	@apiParam (Body Parameters) {String} username Username of User Who Performed Action
*	@apiParam (Body Parameters) {String} action Action to Log
*
*	@apiParamExample {json} Request Example:
*		POST /audit/1111
*		{
*			"username": "SMITHJ01",
*			"action": "Changed Quantity of Product 1234567890123"
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Action Logged Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the site code is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the username is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Username Provided",
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
*/

/**
*	@api {get} /audit/:code/ Get Logged Actions
*	@apiVersion 1.5.0
*	@apiDescription Gets all logged actions at a site.
*	@apiName GetLog
*	@apiGroup Audit Logs
*
*	@apiPermission Managers or Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site
*
*	@apiParamExample {json} Request Example:
*		GET /audit/1111
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Audit Logs Retrieved Successfully",
*		    "data": [
*				{
*					"site": {
*						"code": 1111,
*						"name": "My Store",
*						"type": "Store"
*					},
*					"user": {
*		        		"firstName": "John",
*		        		"lastName": "Smith",
*		        		"username": "SMITHJ01",
*		        		"userType": "Salesperson",
*		        		"site": 
*		        		    "code": 1111,
*		        		    "name": "My Store",
*							"type": "Store"
*		        		}
*					},
*					"action": "Changed Quantity of Product 1234567890123",
*					"timestamp": "2021-01-01T12:00:00.000Z"
*				},
*				{
*					"site": {
*						"code": 1111,
*						"name": "My Store",
*						"type": "Store"
*					},
*					"user": {
*		        		"firstName": "John",
*		        		"lastName": "Smith",
*		        		"username": "SMITHJ01",
*		        		"userType": "Salesperson",
*		        		"site": 
*		        		    "code": 1111,
*		        		    "name": "My Store",
*							"type": "Store"
*		        		}
*					},
*					"action": "Changed Quantity of Product 1234567890124",
*					"timestamp": "2021-01-01T11:00:00.000Z"
*				},
*				...
*			]
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the site code is invalid or missing
*		HTTP/1.1 400
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/