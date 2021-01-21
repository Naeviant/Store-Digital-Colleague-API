/**
*	@api {get} /delivery/inbound/:code Get Inbound Deliveries
*	@apiVersion 1.5.2
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
*		                        "status": "Live",
*		                        "ean": "1234567890123",
*		                        "name": "My Product",
*		                        "price": 10,
*		                        "description": "My Test Product",
*		                        "ageRestricted": false,
*		                        "info": [
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d85",
*		                                "name": "Weight",
*		                                "value": "1kg"
*		                            },
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d86",
*		                                "name": "Material",
*		                                "value": "Wood"
*		                            }
*		                        ]
*			                },
*			                "quantity": 2
*			            },
*			            {
*			                "product": {
*		                        "status": "Discontinued",
*		                        "ean": "1234567890124",
*		                        "name": "My Other Product",
*		                        "price": 12.5,
*		                        "description": "My Other Test Product",
*		                        "ageRestricted": true,
*		                        "info": [
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d89",
*		                                "name": "Weight",
*		                                "value": "2kg"
*		                            },
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d90",
*		                                "name": "Material",
*		                                "value": "Metal"
*		                            }
*		                        ]
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
*	@apiVersion 1.5.2
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
*		                        "status": "Live",
*		                        "ean": "1234567890123",
*		                        "name": "My Product",
*		                        "price": 10,
*		                        "description": "My Test Product",
*		                        "ageRestricted": false,
*		                        "info": [
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d85",
*		                                "name": "Weight",
*		                                "value": "1kg"
*		                            },
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d86",
*		                                "name": "Material",
*		                                "value": "Wood"
*		                            }
*		                        ]
*			                },
*			                "quantity": 2
*			            },
*			            {
*			                "product": {
*		                        "status": "Discontinued",
*		                        "ean": "1234567890124",
*		                        "name": "My Other Product",
*		                        "price": 12.5,
*		                        "description": "My Other Test Product",
*		                        "ageRestricted": true,
*		                        "info": [
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d89",
*		                                "name": "Weight",
*		                                "value": "2kg"
*		                            },
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d90",
*		                                "name": "Material",
*		                                "value": "Metal"
*		                            }
*		                        ]
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
*	@apiVersion 1.5.2
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
*			    "products": [
*			        {
*			            "product": {
*		                    "status": "Live",
*		                    "ean": "1234567890123",
*		                    "name": "My Product",
*		                    "price": 10,
*		                    "description": "My Test Product",
*		                    "ageRestricted": false,
*		                    "info": [
*		                        {
*		                            "_id": "5fe748cf43ac916074cb0d85",
*		                            "name": "Weight",
*		                            "value": "1kg"
*		                        },
*		                        {
*		                            "_id": "5fe748cf43ac916074cb0d86",
*		                            "name": "Material",
*		                            "value": "Wood"
*		                        }
*		                    ]
*			            },
*			            "quantity": 2
*			        },
*			        {
*			            "product": {
*		                    "status": "Discontinued",
*		                    "ean": "1234567890124",
*		                    "name": "My Other Product",
*		                    "price": 12.5,
*		                    "description": "My Other Test Product",
*		                    "ageRestricted": true,
*		                    "info": [
*		                        {
*		                            "_id": "5fe748cf43ac916074cb0d89",
*		                            "name": "Weight",
*		                            "value": "2kg"
*		                        },
*		                        {
*		                            "_id": "5fe748cf43ac916074cb0d90",
*		                            "name": "Material",
*		                            "value": "Metal"
*		                        }
*		                    ]
*			            },
*			            "quantity": 3
*			        }
*			    ],
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
*	@api {get} /delivery/product/:code/:ean Get Product Deliveries
*	@apiVersion 1.5.2
*	@apiDescription Gets all existing deliveries that are expected to arrive at a site which contain a product.
*	@apiName GetProductDeliveries
*	@apiGroup Deliveries
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} ean EAN/Barcode of Product 
*
*	@apiParamExample {json} Request Example:
*		GET /delivery/product/1111/1234567890123
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
*		                        "status": "Live",
*		                        "ean": "1234567890123",
*		                        "name": "My Product",
*		                        "price": 10,
*		                        "description": "My Test Product",
*		                        "ageRestricted": false,
*		                        "info": [
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d85",
*		                                "name": "Weight",
*		                                "value": "1kg"
*		                            },
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d86",
*		                                "name": "Material",
*		                                "value": "Wood"
*		                            }
*		                        ]
*			                },
*			                "quantity": 2
*			            },
*			            {
*			                "product": {
*		                        "status": "Discontinued",
*		                        "ean": "1234567890124",
*		                        "name": "My Other Product",
*		                        "price": 12.5,
*		                        "description": "My Other Test Product",
*		                        "ageRestricted": true,
*		                        "info": [
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d89",
*		                                "name": "Weight",
*		                                "value": "2kg"
*		                            },
*		                            {
*		                                "_id": "5fe748cf43ac916074cb0d90",
*		                                "name": "Material",
*		                                "value": "Metal"
*		                            }
*		                        ]
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
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the provided site code was invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the provided EAN was invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid EAN Provided",
*		    "data": []
*		}
*/