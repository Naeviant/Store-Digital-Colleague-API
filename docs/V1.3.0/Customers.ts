/**
*	@api {post} /customer Create New Customer
*	@apiVersion 1.3.0
*	@apiDescription Creates a new customer.
*	@apiName AddCustomer
*	@apiGroup Customers
*
*	@apiPermission Any Authenticated User
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (Body Parameters) {String="Mr","Ms","Mrs","Miss","Mx"} title Title of Customer
*	@apiParam (Body Parameters) {String} firstName First Name of Customer
*	@apiParam (Body Parameters) {String} lastName Last Name of Customer
*	@apiParam (Body Parameters) {String} email Email Address of Customer
*	@apiParam (Body Parameters) {String} password Customer's Password for Online Account
*	@apiParam (Body Parameters) {String} addressNumberName House Number of Name of Customer's Address
*	@apiParam (Body Parameters) {String} addressStreet1 Address Line 1 of Customer's Address
*	@apiParam (Body Parameters) {String} [addressStreet2] Address Line 1 of Customer's Address
*	@apiParam (Body Parameters) {String} addressCity City of Customer's Address
*	@apiParam (Body Parameters) {String} addressPostcode Postcode of Customer's Address
*	@apiParam (Body Parameters) {String} mobilePhone UK Mobile Phone Number of Customer
*
*	@apiParamExample {json} Request Example:
*		POST /customer
*		{
*			title: 'Mr',
*			firstName: 'John',
*			lastName: 'Smith',
*			email: 'example@example.com',
*			password: 'password',
*			addressNumberName: '1',
*			addressStreet1: 'Test Street',
*			addressCity: 'Test Town',
*			addressPostcode: 'AB12CD',
*			mobilePhone: '07123456789'
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Customer Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when customer number is already in use (try again to get a new one)
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Customer Number Already in Use",
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
*	@api {get} /customer/:customer Get Customer
*	@apiVersion 1.3.0
*	@apiDescription Gets an existing customer.
*	@apiName GetCustomer
*	@apiGroup Customers
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number} customer Customer Number 
*
*	@apiParamExample {json} Request Example:
*		GET /customer/10000000000
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Customer Retrieved Successfully",
*		    "data": {
*      			"_id": "5ff4b2085cec1f06cc316675",
*      			"title": "Mr",
*      			"firstName": "John",
*      			"lastName": "Smith",
*      			"email": "example@example.com",
*      			"addressNumberName": "1",
*      			"addressStreet1": "Test Street",
*      			"addressCity": "Test Town",
*      			"addressPostcode": "AB12CD",
*      			"mobilePhone": "07123456789",
*      			"customerNumber": 1000000000
*		    }
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no customer has the provided customer number
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Customer Not Found",
*		    "data": []
*		}
*/

/**
*	@api {patch} /customer/:customer Update Customer
*	@apiVersion 1.3.0
*	@apiDescription Updates an existing customer.
*	@apiName UpdateCustomer
*	@apiGroup Customers
*
*	@apiPermission Any Authenticated User
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {Number} customer Customer Number 
*	@apiParam (Body Parameters) {String="Mr","Ms","Mrs","Miss","Mx"} [title] Title of Customer
*	@apiParam (Body Parameters) {String} [firstName] First Name of Customer
*	@apiParam (Body Parameters) {String} [lastName] Last Name of Customer
*	@apiParam (Body Parameters) {String} [email] Email Address of Customer
*	@apiParam (Body Parameters) {String} [password] Customer's Password for Online Account
*	@apiParam (Body Parameters) {String} [addressNumberName] House Number of Name of Customer's Address
*	@apiParam (Body Parameters) {String} [addressStreet1] Address Line 1 of Customer's Address
*	@apiParam (Body Parameters) {String} [addressStreet2] Address Line 1 of Customer's Address
*	@apiParam (Body Parameters) {String} [addressCity] City of Customer's Address
*	@apiParam (Body Parameters) {String} [addressPostcode] Postcode of Customer's Address
*	@apiParam (Body Parameters) {String} [mobilePhone] UK Mobile Phone Number of Customer
*
*	@apiParamExample {json} Request Example:
*		PATCH /customer/1000000000
*		{
*			title: 'Ms',
*			firstName: 'Jo',
*			lastName: 'Bloggs',
*			email: 'example2@example.com',
*			password: 'password123',
*			addressNumberName: '5',
*			addressStreet1: 'Other Test Street',
*			addressCity: 'Other Test Town',
*			addressPostcode: 'EF34GH',
*			mobilePhone: '07987654321'
*		}
*
*	@apiSuccessExample {json} Success Example 1:
*		// Returned when a customer is updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Customer Updated Successfully",
*		    "data": []
*		}
*	@apiSuccessExample {json} Success Example 2:
*		// Returned when a no customers are updated
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
*	@apiErrorExample {json} Error Example 3:
*		// Returned when no customer has the provided customer number
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Customer Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {delete} /customer/:customer Delete Customer
*	@apiVersion 1.3.0
*	@apiDescription	Deletes an existing customer.
*	@apiName DeleteCustomer
*	@apiGroup Customers
*
*	@apiPermission Any Authenticated User
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {Number} customer Customer Number 
*
*	@apiParamExample {json} Request Example:
*		DELETE /customer/1000000000
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Customer Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no customer has the provided customer number
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Customer Number Provided",
*		    "data": []
*		}
*/