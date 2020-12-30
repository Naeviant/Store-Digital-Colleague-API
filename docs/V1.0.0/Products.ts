/**
*	@api {post} /product Create New Product
*	@apiVersion 1.0.0
*	@apiDescription Creates a new product.
*	@apiName AddProduct
*	@apiGroup Products
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (Body Parameters) {String} name Name of Product 
*	@apiParam (Body Parameters) {String} ean EAN/Barcode of Product 
*	@apiParam (Body Parameters) {Number} price Price of Product 
*	@apiParam (Body Parameters) {String="Live","Orders Blocked", "Discontinued"} status Status of Product 
*
*	@apiParamExample {json} Request Example:
*		POST /product
*		{
*			"name": "My Product",
*			"ean": "1234567890123",
*			"price": 10,
*			"status": "Live"
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Product Added Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when provided EAN is already used for another product
*		HTTP/1.1 409 Conflict
*		{
*		    "code": 409,
*		    "status": "Conflict",
*		    "description": "Cannot Add Product: EAN Already in Use",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when required fields are missing from request body
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Add Product: Invalid Request Body",
*		    "data": []
*		}
*/

/**
*	@api {get} /product/:ean Get Product
*	@apiVersion 1.0.0
*	@apiDescription Gets an existing product.
*	@apiName GetProduct
*	@apiGroup Products
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} ean EAN/Barcode of Product 
*
*	@apiParamExample {json} Request Example:
*		GET /product/1234567890123
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Retrieved Successfully",
*		    "data": {
*		        "status": "Live",
*		        "_id": "5fe748cf43ac916074cb0d84",
*		        "name": "My Product",
*		        "price": 10,
*		        "ean": "1234567890123"
*		    }
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when no EAN is provided
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Get Product: Invalid EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no product has the provided EAN
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Product: Product Not Found",
*		    "data": []
*		}
*/

/**
*	@api {get} /product Get All Products
*	@apiVersion 1.0.0
*	@apiDescription Gets all existing products.
*	@apiName GetProducts
*	@apiGroup Products
*
*	@apiPermission None
*
*	@apiParamExample {json} Request Example:
*		GET /product
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Products Retrieved Successfully",
*		    "data": [
*		        {
*		            "status": "Discontinued",
*		            "name": "My Other Product",
*		            "price": 12.5,
*		            "ean": "1234567890124"
*		        },
*		        {
*		            "status": "Live",
*		            "name": "My Product",
*		            "ean": "1234567890123",
*		            "price": 10
*		        },
*				...
*		    ]
*		}
*/

/**
*	@api {patch} /product/:ean Update Product
*	@apiVersion 1.0.0
*	@apiDescription Updates an existing product.
*	@apiName UpdateProduct
*	@apiGroup Products
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String}	ean EAN/Barcode of Product
*	@apiParam (Body Parameters) {String} [name] Name of Product  
*	@apiParam (Body Parameters) {Number} [price] Price of Product 
*	@apiParam (Body Parameters) {String="Live","Orders Blocked", "Discontinued"} [status] Status of Product 
*
*	@apiParamExample {json} Request Example:
*		PATCH /product/1234567890123
*		{
*			"name": "My Updated Product",
*			"price": 5,
*			"status": "Orders Blocked"
*		}
*
*	@apiSuccessExample {json} Success Example 1:
*		// Returned when a product is updated
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Added Successfully",
*		    "data": []
*		}
*	@apiSuccessExample {json} Success Example 2:
*		// Returned when a no products are updated
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
*		    "description": "Cannot Update Product: Invalid Request Body",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when no EAN is provided or no product has the provided EAN
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Update Product: Invalid EAN Provided",
*		    "data": []
*		}
*/

/**
*	@api {delete} /product/:ean Delete Product
*	@apiVersion 1.0.0
*	@apiDescription Deletes an existing product.
*	@apiName DeleteProduct
*	@apiGroup Products
*
*	@apiPermission Admins
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} ean EAN/Barcode of Product 
*
*	@apiParamExample {json} Request Example:
*		DELETE /product/1234567890123
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no EAN is provided or no product has the provided EAN
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Delete Product: Invalid EAN Provided",
*		    "data": []
*		}
*/