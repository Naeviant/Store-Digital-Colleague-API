/**
*	@api {get} /aisle/:code/:aisle Get Aisle
*	@apiVersion 1.2.1
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
*		    "description": "Cannot Get Aisle: Invalid Site Code",
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
*	@api {patch} /aisle/:code/:aisle Update Aisle
*	@apiVersion 1.2.1
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
*	@apiErrorExample {json} Error Example 3:
*		// Returned when the request body is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Update Aisle: Invalid Request Body",
*		    "data": []
*		}
*/