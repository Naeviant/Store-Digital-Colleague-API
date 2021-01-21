/**
*	@api {get} /collection/customer/:customer Get Collections for Customer
*	@apiVersion 1.5.2
*	@apiDescription Gets all existing collections for a customer.
*	@apiName GetCustomerCollections
*	@apiGroup Collections
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number} customer Customer Number 
*
*	@apiParamExample {json} Request Example:
*		GET /collection/customer/10000000000
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Collections Retrieved Successfully",
*		    "data": [
*				{
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "status": "In Progress",
*			        "customer": {
*			            "title": "Mr",
*			            "firstName": "John",
*			            "lastName": "Smith",
*			            "email": "example@example.com",
*			            "addressNumberName": "1",
*			            "addressStreet1": "Test Street",
*			            "addressCity": "Test Town",
*			            "addressPostcode": "AB12CD",
*			            "mobilePhone": "07123456789",
*			            "customerNumber": 1000000000
*			        },
*			        "placedAt": "2021-01-01T12:00:00.000Z",
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
*			                "quantityOrdered": 2,
*			                "quantityPicked": 2
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
*			                "quantityOrdered": 3,
*			                "quantityPicked": 1
*			            }
*			        ],
*			        "collectionNumber": 2000000000
*			    },
*				...
*			]
*		}
*
*/

/**
*	@api {get} /collection/site/:code Get Collections at Site
*	@apiVersion 1.5.2
*	@apiDescription Gets all existing collections at a site.
*	@apiName GetSiteCollections
*	@apiGroup Collections
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /collection/site/1111
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Collections Retrieved Successfully",
*		    "data": [
*				{
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "status": "In Progress",
*			        "customer": {
*			            "title": "Mr",
*			            "firstName": "John",
*			            "lastName": "Smith",
*			            "email": "example@example.com",
*			            "addressNumberName": "1",
*			            "addressStreet1": "Test Street",
*			            "addressCity": "Test Town",
*			            "addressPostcode": "AB12CD",
*			            "mobilePhone": "07123456789",
*			            "customerNumber": 1000000000
*			        },
*			        "placedAt": "2021-01-01T12:00:00.000Z",
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
*			                "quantityOrdered": 2,
*			                "quantityPicked": 2
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
*			                "quantityOrdered": 3,
*			                "quantityPicked": 1
*			            }
*			        ],
*			        "collectionNumber": 2000000000
*			    },
*				...
*			]
*		}
*
*/

/**
*	@api {get} /collection/:collection Get Collection
*	@apiVersion 1.5.2
*	@apiDescription Gets an existing collection.
*	@apiName GetCollection
*	@apiGroup Collections
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiPermission Any Authenticated User
*
*	@apiParam (URL Parameters) {Number} collection Collection Number 
*
*	@apiParamExample {json} Request Example:
*		GET /collection/20000000000
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Collection Retrieved Successfully",
*		    "data": {
*		        "_id": "5ff4c610d77f4f42ac1ec81a",
*		        "site": {
*		            "_id": "5ff4b9e95d24fbd2b623cf0e",
*		            "name": "My Store",
*		            "code": 1111,
*					"type": "Store"
*		        },
*		        "status": "In Progress",
*		        "customer": {
*		            "_id": "5ff4baaf934608061c489056",
*		            "title": "Mr",
*		            "firstName": "John",
*		            "lastName": "Smith",
*		            "email": "example@example.com",
*		            "addressNumberName": "1",
*		            "addressStreet1": "Test Street",
*		            "addressCity": "Test Town",
*		            "addressPostcode": "AB12CD",
*		            "mobilePhone": "07123456789",
*		            "customerNumber": 1000000000
*		        },
*		        "placedAt": "2021-01-01T12:00:00.000Z",
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
*			            "quantityOrdered": 2,
*			            "quantityPicked": 2
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
*			            "quantityOrdered": 3,
*			            "quantityPicked": 1
*			        }
*			    ],
*		        "collectionNumber": 2000000000
*		    }
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no collection has the provided collection number
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Collection Not Found",
*		    "data": []
*		}
*/