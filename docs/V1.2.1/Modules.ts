/**
*	@api {get} /module/:discriminator Get Module
*	@apiVersion 1.2.1
*	@apiDescription Gets an existing module.
*	@apiName GetModule
*	@apiGroup Modules
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} discriminator Unique Identifier for Module (No Spaces Allowed) 
*
*	@apiParamExample {json} Request Example:
*		GET /module/FIRSTMODULE
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Module Retrieved Successfully",
*		    "data": {
*				"_id": "5fe9bb19df6009646cdd6152",
*	            "discriminator": "MYMODULE",
*	            "name": "First Module",
*	            "parts": [...],
*				"startDate": "2020-01-01",
*				"endDate": "2020-12-31"
*		    }
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no module has the provided discriminator
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Module: Module Not Found",
*		    "data": []
*		}
*/