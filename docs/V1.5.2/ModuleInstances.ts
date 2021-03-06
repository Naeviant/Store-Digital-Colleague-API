/**
*	@api {get} /module/site/:code/:discriminator Get Module at Site
*	@apiVersion 1.5.2
*	@apiDescription Gets a module at a site.
*	@apiName GetModuleInstance
*	@apiGroup Modules
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} discriminator Unique Identifier for Module (No Spaces Allowed) 
*	@apiParam (URL Parameters) {String} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /module/site/1111/MYMODULE
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Module at Site Retrieved Successfully",
*			"data": {
*		        "_id": "5fea2c15df105a6b0cfb19f4",
*		        "module": {
*		            "_id": "5fea2ac2df105a6b0cfb19ec",
*		            "discriminator": "MYMODULE",
*		            "name": "First Module",
*		            "startDate": "2020-01-01T00:00:00.000Z",
*		            "endDate": "2020-12-31T00:00:00.000Z",
*		            "products": [
*		                {
*		                    "_id": "5fea2b07df105a6b0cfb19ee",
*		                    "product": {
*		                        "_id": "5fea1d24e7c3576520603cb3",
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
*		                    },
*		                    "facings": 2
*		                },
*		                {
*		                    "_id": "5fea2b1bdf105a6b0cfb19ef",
*		                    "product": {
*		                        "_id": "5fea1d24e7c3576520603cb6",
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
*		                    },
*		                    "facings": 4
*		                },
*						...
*		            ]
*		        },
*		        "site": {
*		            "_id": "5fea1daa72b7842c449562d2",
*		            "name": "My Store",
*		            "code": 1111,
*					"type": "Store"
*		        },
*		        "bay": {
*		            "_id": "5fea28a30e23a205f08182e4",
*		            "bay": 1,
*		            "moduleLimit": 2,
*		            "allowsOverstock": true,
*		            "allowsTopstock": true,
*		            "allowsStockroom": false,
*		            "allowsMultiLocation": true,
*		            "allowsDisplay": false,
*		            "allowsClearance": false,
*		            "aisle": {
*		                "_id": "5fea1e64a264266918add8eb",
*		                "name": "Food",
*		                "aisle": 1,
*		                "site": {
*		                    "_id": "5fea1daa72b7842c449562d2",
*		                    "name": "My Store",
*		                    "code": 1111,
*							"type": "Store"
*		                }
*		            }
*		        }
*		    }
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the module is not assigned to the site
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Module Not at Site",
*			"data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the provided discriminator is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Module Discriminator Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
*		// Returned when the provided site code is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /module/site/:code Get Modules at Site
*	@apiVersion 1.5.2
*	@apiDescription Gets modules at a site.
*	@apiName GetModuleInstances
*	@apiGroup Modules
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /module/site/1111
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Modules at Site Retrieved Successfully",
*		    "data": [
*				{
*			        "module": {
*			            "discriminator": "MYMODULE",
*			            "name": "First Module",
*			            "startDate": "2020-01-01T00:00:00.000Z",
*			            "endDate": "2020-12-31T00:00:00.000Z",
*			            "products": [
*		             	 	{
*		                        "product": {
*		                            "status": "Live",
*		                            "ean": "1234567890123",
*		                            "name": "My Product",
*		                            "price": 10,
*		                            "description": "My Test Product",
*		                            "ageRestricted": false,
*		                            "info": [
*		                                {
*		                                    "name": "Weight",
*		                                    "value": "1kg"
*		                                },
*		                                {
*		                                    "name": "Material",
*		                                    "value": "Wood"
*		                                }
*		                            ]
*		                        },
*			                    "facings": 2
*			                },
*							...
*			            ]
*			        },
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "bay": {
*			            "bay": 1,
*			            "moduleLimit": 2,
*			            "allowsOverstock": true,
*			            "allowsTopstock": true,
*			            "allowsStockroom": false,
*			            "allowsMultiLocation": true,
*			            "allowsDisplay": false,
*			            "allowsClearance": false,
*			            "aisle": {
*			                "name": "Food",
*			                "aisle": 1,
*			                "site": {
*			                    "name": "My Store",
*		        	            "code": 1111,
*								"type": "Store"
*		    	            }
*			            }
*			        }
*			    },
*				{
*			        "module": {
*			            "discriminator": "MYOTHERMODULE",
*			            "name": "Second Module",
*			            "startDate": "2020-01-01T00:00:00.000Z",
*			            "endDate": "2020-12-31T00:00:00.000Z",
*			            "products": [
*		             	 	{
*			                    "product": {
*		                            "status": "Discontinued",
*		                            "ean": "1234567890124",
*		                            "name": "My Other Product",
*		                            "price": 12.5,
*		                            "description": "My Other Test Product",
*		                            "ageRestricted": true,
*		                            "info": [
*		                                {
*		                                    "name": "Weight",
*		                                    "value": "2kg"
*		                                },
*		                                {
*		                                    "name": "Material",
*		                                    "value": "Metal"
*		                                }
*		                            ]
*			                    },
*			                    "facings": 2
*			                },
*							...
*			            ]
*			        },
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "bay": {
*			            "bay": 2,
*			            "moduleLimit": 2,
*			            "allowsOverstock": true,
*			            "allowsTopstock": true,
*			            "allowsStockroom": false,
*			            "allowsMultiLocation": true,
*			            "allowsDisplay": false,
*			            "allowsClearance": false,
*			            "aisle": {
*			                "name": "Food",
*			                "aisle": 1,
*			                "site": {
*			                    "name": "My Store",
*		        	            "code": 1111,
*								"type": "Store"
*		    	            }
*			            }
*			        }
*			    },
*				...
*			]
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the provided site code is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /module/site/:code/:aisle/:bay Get Modules in Bay
*	@apiVersion 1.5.2
*	@apiDescription Gets all modules assigned to a bay.
*	@apiName GetModuleInstancesInBay
*	@apiGroup Modules
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} aisle Aisle Number 
*	@apiParam (URL Parameters) {Number} bay Bay Number 
*
*	@apiParamExample {json} Request Example:
*		GET /module/site/1111/1/1
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Module Assigned Successfully",
*		    "data": [
*				{
*			        "module": {
*			            "discriminator": "MYMODULE",
*			            "name": "First Module",
*			            "startDate": "2020-01-01T00:00:00.000Z",
*			            "endDate": "2020-12-31T00:00:00.000Z",
*			            "products": [
*		             	 	{
*		                        "product": {
*		                            "status": "Live",
*		                            "ean": "1234567890123",
*		                            "name": "My Product",
*		                            "price": 10,
*		                            "description": "My Test Product",
*		                            "ageRestricted": false,
*		                            "info": [
*		                                {
*		                                    "name": "Weight",
*		                                    "value": "1kg"
*		                                },
*		                                {
*		                                    "name": "Material",
*		                                    "value": "Wood"
*		                                }
*		                            ]
*		                        },
*			                    "facings": 2
*			                },
*							...
*			            ]
*			        },
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "bay": {
*			            "bay": 1,
*			            "moduleLimit": 2,
*			            "allowsOverstock": true,
*			            "allowsTopstock": true,
*			            "allowsStockroom": false,
*			            "allowsMultiLocation": true,
*			            "allowsDisplay": false,
*			            "allowsClearance": false,
*			            "aisle": {
*			                "name": "Food",
*			                "aisle": 1,
*			                "site": {
*			                    "name": "My Store",
*		        	            "code": 1111,
*								"type": "Store"
*		    	            }
*			            }
*			        }
*			    },
*				{
*			        "module": {
*			            "discriminator": "MYOTHERMODULE",
*			            "name": "Second Module",
*			            "startDate": "2020-01-01T00:00:00.000Z",
*			            "endDate": "2020-12-31T00:00:00.000Z",
*			            "products": [
*		             	 	{
*			                    "product": {
*		                            "status": "Discontinued",
*		                            "ean": "1234567890124",
*		                            "name": "My Other Product",
*		                            "price": 12.5,
*		                            "description": "My Other Test Product",
*		                            "ageRestricted": true,
*		                            "info": [
*		                                {
*		                                    "name": "Weight",
*		                                    "value": "2kg"
*		                                },
*		                                {
*		                                    "name": "Material",
*		                                    "value": "Metal"
*		                                }
*		                            ]
*			                    },
*			                    "facings": 2
*			                },
*							...
*			            ]
*			        },
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "bay": {
*			            "bay": 1,
*			            "moduleLimit": 2,
*			            "allowsOverstock": true,
*			            "allowsTopstock": true,
*			            "allowsStockroom": false,
*			            "allowsMultiLocation": true,
*			            "allowsDisplay": false,
*			            "allowsClearance": false,
*			            "aisle": {
*			                "name": "Food",
*			                "aisle": 1,
*			                "site": {
*			                    "name": "My Store",
*		        	            "code": 1111,
*								"type": "Store"
*		    	            }
*			            }
*			        }
*			    },
*				...
*			]
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the provided site code, aisle number or bay number is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code, Aisle Number or Bay Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /module/site/:code/product/:ean Get Product Modules
*	@apiVersion 1.5.2
*	@apiDescription Gets all modules which contain a given product.
*	@apiName GetProductModules
*	@apiGroup Modules
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} ean EAN/Barcode of Product 
*
*	@apiParamExample {json} Request Example:
*		GET /module/site/1111/product/1234567890123
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Modules Retrieved Successfully",
*		    "data": [
*				{
*			        "module": {
*			            "discriminator": "MYMODULE",
*			            "name": "First Module",
*			            "startDate": "2020-01-01T00:00:00.000Z",
*			            "endDate": "2020-12-31T00:00:00.000Z",
*			            "products": [
*		             	 	{
*		                        "product": {
*		                            "status": "Live",
*		                            "ean": "1234567890123",
*		                            "name": "My Product",
*		                            "price": 10,
*		                            "description": "My Test Product",
*		                            "ageRestricted": false,
*		                            "info": [
*		                                {
*		                                    "name": "Weight",
*		                                    "value": "1kg"
*		                                },
*		                                {
*		                                    "name": "Material",
*		                                    "value": "Wood"
*		                                }
*		                            ]
*		                        },
*			                    "facings": 2
*			                },
*							...
*			            ]
*			        },
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "bay": {
*			            "bay": 1,
*			            "moduleLimit": 2,
*			            "allowsOverstock": true,
*			            "allowsTopstock": true,
*			            "allowsStockroom": false,
*			            "allowsMultiLocation": true,
*			            "allowsDisplay": false,
*			            "allowsClearance": false,
*			            "aisle": {
*			                "name": "Food",
*			                "aisle": 1,
*			                "site": {
*			                    "name": "My Store",
*		        	            "code": 1111,
*								"type": "Store"
*		    	            }
*			            }
*			        }
*			    },
*				{
*			        "module": {
*			            "discriminator": "MYOTHERMODULE",
*			            "name": "Second Module",
*			            "startDate": "2020-01-01T00:00:00.000Z",
*			            "endDate": "2020-12-31T00:00:00.000Z",
*			            "products": [
*		             	 	{
*		                        "product": {
*		                            "status": "Live",
*		                            "ean": "1234567890123",
*		                            "name": "My Product",
*		                            "price": 10,
*		                            "description": "My Test Product",
*		                            "ageRestricted": false,
*		                            "info": [
*		                                {
*		                                    "name": "Weight",
*		                                    "value": "1kg"
*		                                },
*		                                {
*		                                    "name": "Material",
*		                                    "value": "Wood"
*		                                }
*		                            ]
*		                        },
*			                    "facings": 1
*			                },
*							...
*			            ]
*			        },
*			        "site": {
*			            "name": "My Store",
*			            "code": 1111,
*						"type": "Store"
*			        },
*			        "bay": {
*			            "bay": 1,
*			            "moduleLimit": 2,
*			            "allowsOverstock": true,
*			            "allowsTopstock": true,
*			            "allowsStockroom": false,
*			            "allowsMultiLocation": true,
*			            "allowsDisplay": false,
*			            "allowsClearance": false,
*			            "aisle": {
*			                "name": "Food",
*			                "aisle": 1,
*			                "site": {
*			                    "name": "My Store",
*		        	            "code": 1111,
*								"type": "Store"
*		    	            }
*			            }
*			        }
*			    },
*				...
*			]
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the provided site code is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the provided EAN is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid EAN Provided",
*		    "data": []
*		}
*/