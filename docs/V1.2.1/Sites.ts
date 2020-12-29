/**
*	@api {get} /site/:code Get Site
*	@apiVersion 1.2.1
*	@apiDescription Gets an existing site.
*	@apiName GetSite
*	@apiGroup Sites
*
*	@apiPermission None
*
*	@apiParam (URL Parameters) {String} code ID Code of Site 
*
*	@apiParamExample {json} Request Example:
*		GET /site/1111
*	
*	@apiSuccessExample Success Example:
*		HTTP/1.1 200 OK
*		{
*		    "code": 200,
*		    "status": "OK",
*		    "description": "Site Retrieved Successfully",
*		    "data": {
*				"_id": "5fe7481543ac916074cb0d81",
*				"name": "My Store",
*				"code": 1111		        
*		    }
*		}
*
*	@apiErrorExample {json} Error Example:
*		// Returned when no site has the provided code
*		HTTP/1.1 404 Not Found
*		{
*		    "code": 404,
*		    "status": "Not Found",
*		    "description": "Cannot Get Site: Site Code Not Found",
*		    "data": []
*		}
*/