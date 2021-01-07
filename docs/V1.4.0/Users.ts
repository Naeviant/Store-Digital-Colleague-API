/**
*	@api {get} /user/:username Get User
*	@apiVersion 1.4.0
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
*		            "name": "My Store",
*					"type": "Store"
*		        }
*		    }
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no user has the provided username
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "User Not Found",
*		    "data": []
*		}
*/