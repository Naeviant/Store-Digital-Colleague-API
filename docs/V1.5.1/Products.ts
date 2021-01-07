/**
*	@api {patch} /product/quantity/:code/:ean Modify Product Quantity
*	@apiVersion 1.5.1
*	@apiDescription Modifies the quantity of an existing product at an existing site.
*	@apiName SetProductQuantity
*	@apiGroup Products
*
*	@apiPermission Any Authenticated User
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {Number{4}} code ID Code of Site 
*	@apiParam (URL Parameters) {Number} ean EAN/Barcode of Product
*	@apiParam (Body Parameters) {String="set","increment","decrement"} [method] Method to Modify Quantity. Defaults to set.
*	@apiParam (Body Parameters) {Number} quantity New Quantity of Product at Site
*
*	@apiParamExample {json} Request Example:
*		PATCH /product/quantity/1111/1234567890123
*		{
*			"quantity": 5
*		}
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Product Quantity Updated Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the provided EAN is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Set Product Quantity: Invalid EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the provided site code is invalid
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Cannot Set Product Quantity: Invalid Site Code Provided",
*		    "data": []
*		}
*/