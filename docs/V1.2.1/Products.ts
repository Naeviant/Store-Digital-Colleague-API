/**
*	@api {get} /product/:ean Get Product
*	@apiVersion 1.2.1
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
*	@apiErrorExample {json} Error Example:
*		// Returned when no product has the provided EAN
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Product: Product Not Found",
*		    "data": []
*		}
*/