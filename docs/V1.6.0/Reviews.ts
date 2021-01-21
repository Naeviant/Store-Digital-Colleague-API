/**
*	@api {post} /review Create New Review
*	@apiVersion 1.6.0
*	@apiDescription Add a review for a product.
*	@apiName AddReview
*	@apiGroup Reviews
*
*	@apiPermission Any Authenticated Users
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (Body Parameters) {String} customer Customer Number of Customer Leaving Review
*	@apiParam (Body Parameters) {String} ean EAN/Barcode of Product to be Reviewed
*	@apiParam (Body Parameters) {Number=1,2,3,4,5} rating A Star Rating for the Product 
*	@apiParam (Body Parameters) {String} [review] A Text Review of the Product
*
*	@apiParamExample {json} Request Example:
*       POST /review
*       {
*           "customer": "1000000000",
*           "ean": "1234567890123",
*           "rating": 4,
*           "review": "I would recommend it."
*       }
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 201,
*		    "status": "Created",
*		    "description": "Review Created Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the customer number is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Customer Number Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 3:
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
*	@api {get} /review/product/:ean Get Product's Reviews
*	@apiVersion 1.6.0
*	@apiDescription Get all reviews for a product.
*	@apiName GetProductReviews
*	@apiGroup Reviews
*
*	@apiPermission Any Authenticated Users
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} ean EAN/Barcode of Product to be Reviewed
*
*	@apiParamExample {json} Request Example:
*       GET /review/product/1234567890123
*
*	@apiSuccessExample {json} Success Example:
*       HTTP/1.1 201 Created
*       {
*           "code": 200,
*           "status": "OK",
*           "description": "Reviews Retrieved Successfully",
*           "data": [
*                {
*                    "customer": {
*                        "_id": "5ff4b2085cec1f06cc316675",
*                        "title": "Mr",
*                        "firstName": "John",
*                        "lastName": "Smith",
*                        "customerNumber": 1000000000
*                    },
*                    "product": {
*                       "name": "My Product",
*                       "ean": "1234567890123",
*                       "price": 10,
*                       "status": "Live",
*                       "description": "My Test Product",
*                       "ageRestricted": false,
*                       "info": [
*                           {
*                               "name": "Weight",
*                               "value": "1kg"
*                           },
*                           {
*                               "name": "Material",
*                               "value": "Wood"
*                           }
*                       ]
*                    },
*                    "rating": 5,
*                    "review": "Incredible!",
*                    "timestamp": "2021-01-21T20:21:16.045Z"
*                },
*           ]
*       }
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid EAN Provided",
*		    "data": []
*		}
*/

/**
*	@api {get} /review/customer/:customer Get Customer's Reviews
*	@apiVersion 1.6.0
*	@apiDescription Get all reviews that a customer has left for a review.
*	@apiName GetCustomerReviews
*	@apiGroup Reviews
*
*	@apiPermission Any Authenticated Users
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} customer Customer Number of Customer Leaving Review
*
*	@apiParamExample {json} Request Example:
*       GET /review/customer/1000000000
*
*	@apiSuccessExample {json} Success Example:
*       HTTP/1.1 201 Created
*       {
*           "code": 200,
*           "status": "OK",
*           "description": "Reviews Retrieved Successfully",
*           "data": [
*                {
*                    "customer": {
*                        "_id": "5ff4b2085cec1f06cc316675",
*                        "title": "Mr",
*                        "firstName": "John",
*                        "lastName": "Smith",
*                        "customerNumber": 1000000000
*                    },
*                    "product": {
*                       "name": "My Product",
*                       "ean": "1234567890123",
*                       "price": 10,
*                       "status": "Live",
*                       "description": "My Test Product",
*                       "ageRestricted": false,
*                       "info": [
*                           {
*                               "name": "Weight",
*                               "value": "1kg"
*                           },
*                           {
*                               "name": "Material",
*                               "value": "Wood"
*                           }
*                       ]
*                    },
*                    "rating": 5,
*                    "review": "Incredible!",
*                    "timestamp": "2021-01-21T20:21:16.045Z"
*                },
*           ]
*       }
*
*	@apiErrorExample {json} Error Example:
*		// Returned when the customer number is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Customer Number Provided",
*		    "data": []
*		}
*/

/**
*	@api {delete} /review/:customer/:ean Delete Reviews
*	@apiVersion 1.6.0
*	@apiDescription Delete all reviews for a product by a given customer.
*	@apiName DeleteReviews
*	@apiGroup Reviews
*
*	@apiPermission Any Authenticated Users
*
*	@apiHeader {String} Authorization Authorization Token
*
*	@apiParam (URL Parameters) {String} customer Customer Number of Customer Leaving Review
*	@apiParam (URL Parameters) {String} ean EAN/Barcode of Product to be Reviewed
*
*	@apiParamExample {json} Request Example:
*       DELETE /review/1000000000/1234567890123
*
*	@apiSuccessExample {json} Success Example:
*		HTTP/1.1 201 Created
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Reviews Deleted Successfully",
*		    "data": []
*		}
*
*	@apiErrorExample {json} Error Example 1:
*		// Returned when the EAN is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid EAN Provided",
*		    "data": []
*		}
*	@apiErrorExample {json} Error Example 2:
*		// Returned when the customer number is invalid or missing
*		HTTP/1.1 400 Bad Request
*		{
*		    "code": 400,
*		    "status": "Bad Request",
*		    "description": "Invalid Customer Number Provided",
*		    "data": []
*		}
*/