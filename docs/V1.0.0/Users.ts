/**
*	@api {post} /user Create New User
*	@apiVersion 1.0.0
*	@apiDescription Creates a new user.
*	@apiName AddUser
*	@apiGroup Users
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (Body Parameters) {String} firstName First Name of User
*	@apiParam (Body Parameters) {String} lastName Last Name of User
*	@apiParam (Body Parameters) {String} username Username of User
*	@apiParam (Body Parameters) {String} password Password of User
*	@apiParam (Body Parameters) {String="Salesperson","Manager","Admin"} userType Type of User
*	@apiParam (Body Parameters) {Number{4}} code ID Code of Site where User Works
*
*	@apiParamExample {json} Request Example:
*		POST /user
*		{
*		    "firstName": "John",
*		    "lastName": "Smith",
*		    "username": "SMITHJ01",
*		    "password": "V3ryS3cr3t",
*		    "userType": "Salesperson",
*		    "code": 1111
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "User Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when provided username is already used for another name
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Add User: Username Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add User: Invalid Request Body",
*		    "data": []
*		}
*/

/**
*	@api {get} /user/:username Get User
*	@apiVersion 1.0.0
*	@apiDescription Gets an existing user.
*	@apiName GetUser
*	@apiGroup Users
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} username Username of User 
*
*	@apiParamExample {json} Request Example:
*		GET /user/SMITHJ01
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "User Retrieved Successfully",
*		    "data": {
*		        "_id": "5fe8d377fea6552688abeeb1",
*		        "firstName": "John",
*		        "lastName": "Smith",
*		        "username": "SMITHJ01",
*		        "userType": "Salesperson",
*		        "site": {
*		            "_id": "5fe78f73efda845ed089e046",
*		            "code": 1111,
*		            "name": "My Store"
*		        }
*		    }
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when no username is provided
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Username: Invalid Username Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no user has the provided username
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Username: User Not Found",
*		    "data": []
*		}
*/

/**
*	@api {patch} /user/:username Update User
*	@apiVersion 1.0.0
*	@apiDescription Updates an existing user.
*	@apiName UpdateUser
*	@apiGroup Users
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String}	username Username of User
*	@apiParam (Body Parameters) {String} [firstName] First Name of User
*	@apiParam (Body Parameters) {String} [lastName] Last Name of User
*	@apiParam (Body Parameters) {String} [username] Username of User
*	@apiParam (Body Parameters) {String} [password] Password of User
*	@apiParam (Body Parameters) {String="Salesperson","Manager","Admin"} [userType] Type of User
*	@apiParam (Body Parameters) {Number{4}} [code] ID Code of Site where User Works
*
*	@apiParamExample {json} Request Example:
*		PATCH /user/SMITHJ01
*		{
*		    "firstName": "Joe",
*		    "lastName": "Bloggs",
*		    "username": "BLOGGJ01",
*		    "password": "M0r3S3cur3",
*		    "userType": "Salesperson",
*		    "code": 1112
*		}
*
*	@apiSuccessExample {json} Success Example 1:
*		// Returned when a user is updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "User Updated Successfully",
*		    "data": []
*		}
*	@apiSuccessExample {json} Success Example 2:
*		// Returned when a no users are updated
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
*		    "description": "Cannot Update User: Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no site has the provided code
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Update User: Invalid Site Code Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
*		// Returned when a new username is already in use
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Update User: New Username Already in Use",
*		    "data": []
*		}
*/

/**
*	@api {delete} /user/:username Delete User
*	@apiVersion 1.0.0
*	@apiDescription	Deletes an existing user.
*	@apiName DeleteUser
*	@apiGroup Users
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} username Username of User 
*
*	@apiParamExample {json} Request Example:
*		DELETE /user/SMITHJ01
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "User Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no username is provided or no user has the provided username
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Delete Site: Invalid Username Provided",
*		    "data": []
*		}
*/

/**
*	@api {post} /authenticate Authenticate
*	@apiVersion 1.0.0
*	@apiDescription	Requests a token to perform actions on the behalf of a user.
*	@apiName Authenticate
*	@apiGroup Users
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} username Username of User 
*	@apiParam (URL Parameters) {String} password Password of User 
*
*	@apiParamExample {json} Request Example:
*		POST /authenticate
*		{
*		    "username": "SMITHJ01",
*		    "password": "V3ryS3cr3t",			
*		}
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Authentication Sucessful",
*		    "data": <TOKEN>
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the provided credentials were invalid
*		HTTP/1.1 401 Forbidden
*		{
*		    "code": 401,
*		    "status": "Forbidden",
*		    "description": "Invalid Credentials Provided",
*		    "data": []
*		}
*/