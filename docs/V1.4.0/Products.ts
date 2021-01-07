/**
*	@api {get} /product/quantity/:code/:ean Get Product Quantity
*	@apiVersion 1.4.0
*	@apiDescription Gets the quantity of an existing product at an existing site.
*	@apiName GetProductQuantity
*	@apiGroup Products
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} ean EAN/Barcode of Product
*
*	@apiParamExample {json} Request Example:
*		GET /product/quantity/1111/1234567890123
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Quantity Retrieved Successfully",
*		    "data": {
*		        "_id": "5feb10d48f4743691ce3eb73",
*		        "product": {
*		            "status": "Live",
*		            "_id": "5feb10d48f4743691ce3eb6e",
*		            "ean": "1234567890123",
*		            "name": "My Product",
*		            "price": 10
*		        },
*		        "site": {
*		            "_id": "5fea1daa72b7842c449562d2",
*		            "name": "My Store",
*		            "code": 1111,
*					"type": "Store"
*		        },
*		        "quantity": 3
*			}
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the provided EAN is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the provided site code is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Site Code Provided",
*		    "data": []
*		}
*/