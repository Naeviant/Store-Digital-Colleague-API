class ResponseBody {
	code: number;
	status: string;
	description: string;

	constructor(code: number, description: string) {
		this.code = code;
		switch (code) {
		case 200: this.status = 'OK'; break;
		case 201: this.status = 'Created'; break;
		case 202: this.status = 'Accepted'; break;
		case 204: this.status = 'No Content'; break;
		case 400: this.status = 'Bad Request'; break;
		case 401: this.status = 'Unauthorised'; break; // No Auth Provided
		case 403: this.status = 'Forbidden'; break; // User Cannot Perform Action
		case 404: this.status = 'Not Found'; break;
		case 405: this.status = 'Method Not Allowed'; break;
		case 410: this.status = 'Gone'; break;
		case 418: this.status = 'Coming Soon'; break;
		case 429: this.status = 'Too Many Requests'; break;
		default: this.status = 'Internal Server Error'; break;
		}
		this.description = description;
	}
}

import { Product } from '../entities/Product';
export class ProductResponse extends ResponseBody {
	data!: typeof Product[];

	constructor(code: number, description: string, data?: typeof Product[]) {
		super(code, description);
		this.data = data ?? [];
	}
}