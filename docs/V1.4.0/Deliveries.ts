/**
*	@api {post} /delivery Create New Delivery
*	@apiVersion 1.4.0
*	@apiDescription Creates a new delivery.
*	@apiName AddDelivery
*	@apiGroup Deliveries
*
*	@apiPermission Any Authenticated User
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (Body Parameters) {Number{4}} outbound ID Code of Sending Site
*	@apiParam (Body Parameters) {Number{4}} inbound ID Code of Receiving Site
*	@apiParam (Body Parameters) {Date} arrivesAt Date Delivery is Due to Arrive (Format: YYYY-MM-DD)
*	@apiParam (Body Parameters) {Object[]} products Array of Products to be Delivered
*	@apiParam (Body Parameters) {String} products.ean EAN of Product to be Delivered
*	@apiParam (Body Parameters) {String} products.quantity Quantity of Product to be Delivered
*
*	@apiParamExample {json} Request Example:
*		POST /delivery
*		{
*			"outboumd": 1111,
*			"inbound": 1112,
*			"arrivesAt": "2021-12-31",
*			"products": [
*				{
*					"ean": "1234567890123",
*					"quantity": 2
*				},
*				{
*					"ean": "1234567890124",
*					"quantity": 3
*				},
*				...
*			]
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Delivery Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when delivery number is already in use (try again to get a new one)
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Delivery Number Already in Use",
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
*	@api {get} /delivery/inbound/:code Get Inbound Deliveries
*	@apiVersion 1.4.0
*	@apiDescription Gets all existing deliveries that are expected to arrive at a site.
*	@apiName GetInboundDeliveries
*	@apiGroup Deliveries
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /delivery/inbound/1111
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Deliveries Retrieved Successfully",
*		    "data": [
*				{
*			        "inbound": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*					"outbound": {
*			            "name": "My Other Store",
*			            "code": 1112,
*						"type": "Store"
*			        },
*			        "status": "Booked",
*			        "arriveAt": "2021-12-31T12:00:00.000Z",
*			        "products": [
*			            {
*			                "product": {
*			                    "status": "Live",
*			                    "ean": "1234567890123",
*			                    "price": 10,
*			                    "name": "My Product"
*			                },
*			                "quantity": 2
*			            },
*			            {
*			                "product": {
*			                    "status": "Discontinued",
*			                    "ean": "1234567890124",
*			                    "price": 12.5,
*			                    "name": "My Other Product"
*			                },
*			                "quantity": 3
*			            }
*			        ],
*			        "deliveryNumber": 3000000000
*			    },
*				...
*			]
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the provided site code was invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /delivery/outbound/:code Get Outbound Deliveries
*	@apiVersion 1.4.0
*	@apiDescription Gets all existing deliveries that are expected to leave from a site.
*	@apiName GetOutboundDeliveries
*	@apiGroup Deliveries
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /delivery/outbound/1111
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Deliveries Retrieved Successfully",
*		    "data": [
*				{
*					"inbound": {
*			            "name": "My Other Store",
*			            "code": 1112,
*						"type": "Store"
*			        },
*			        "outbound": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "status": "Booked",
*			        "arriveAt": "2021-12-31T12:00:00.000Z",
*			        "products": [
*			            {
*			                "product": {
*			                    "status": "Live",
*			                    "ean": "1234567890123",
*			                    "price": 10,
*			                    "name": "My Product"
*			                },
*			                "quantity": 2
*			            },
*			            {
*			                "product": {
*			                    "status": "Discontinued",
*			                    "ean": "1234567890124",
*			                    "price": 12.5,
*			                    "name": "My Other Product"
*			                },
*			                "quantity": 3
*			            }
*			        ],
*			        "deliveryNumber": 3000000001
*			    },
*				...
*			]
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the provided site code was invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /delivery/:delivery Get Delivery
*	@apiVersion 1.4.0
*	@apiDescription Gets an existing delivery.
*	@apiName GetDelivery
*	@apiGroup Deliveries
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number} delivery Delivery Number 
*
*	@apiParamExample {json} Request Example:
*		GET /delivery/30000000000
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Delivery Retrieved Successfully",
*		    "data": {
*				"_id": "5ff4c610d77f4f42ac1ec82a",
*				"inbound": {
*					"_id": "5fe7481543ac916074cb0d82",
*		            "name": "My Other Store",
*		            "code": 1112,
*					"type": "Store"
*		        },
*		        "outbound": {
*					"_id": "5fe7481543ac916074cb0d81",
*		            "name": "My Store",
*		            "code": 1111,
*					"type": "Store"
*		        },
*		        "status": "Booked",
*		        "arriveAt": "2021-12-31T12:00:00.000Z",
*		        "products": [
*		            {
*						"_id": "5ff4c610d77f4f42ac1ec81b",
*		                "product": {
*							"_id": "5fe748cf43ac916074cb0d84",
*		                    "status": "Live",
*		                    "ean": "1234567890123",
*		                    "price": 10,
*		                    "name": "My Product"
*		                },
*		                "quantity": 2
*		            },
*		            {
*						"_id": "5ff4c610d77f4f42ac1ec81c",
*		                "product": {
*							"_id": "5fe748cf43ac916074cb0d85",
*		                    "status": "Discontinued",
*		                    "ean": "1234567890124",
*		                    "price": 12.5,
*		                    "name": "My Other Product"
*		                },
*		                "quantity": 3
*		            }
*		        ],
*		        "deliveryNumber": 3000000000
*		    }
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no delivery has the provided delivery number
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Delivery Not Found",
*		    "data": []
*		}
*/

/**
*	@api {patch} /delivery/:delivery Update Delivery
*	@apiVersion 1.4.0
*	@apiDescription	Updates an existing delivery.
*	@apiName UpdateDelivery
*	@apiGroup Deliveries
*
*	@apiPermission Any Authenticated User
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {Number} delivery Delivery Number 
*	@apiParam (Body Parameters) {String="Booked","In Transit","Completed"} status Status of the Delivery
*
*	@apiParamExample {json} Request Example:
*		PATCH /delivery/3000000000
*		{
*			"status": "In Transit"
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Delivery Updated Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when no delivery has the provided delivery number
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Delivery Number Provided",
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
*	@api {delete} /delivery/:delivery Delete Delivery
*	@apiVersion 1.4.0
*	@apiDescription	Deletes an existing delivery.
*	@apiName DeleteDelivery
*	@apiGroup Deliveries
*
*	@apiPermission Any Authenticated User
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {Number} delivery Delivery Number 
*
*	@apiParamExample {json} Request Example:
*		DELETE /delivery/3000000000
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Delivery Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no delivery has the provided delivery number
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Delivery Number Provided",
*		    "data": []
*		}
*/