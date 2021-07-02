import { Injectable } from '@nestjs/common';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/'


@Injectable()
export class EsbService {

	async executeGetRequests(headers) {
		const destination = BASE_URL + headers['url-destination'];
		const response = await axios.get(destination, {headers})
		.then(res => res.data)
		.catch(err => err);
		return response;
	}

	async executePostRequests(headers, body){
		const destination = BASE_URL + headers['url-destination'];
		const response = await axios.post(destination, body, {headers})
		.then(res => res.data)
		.catch(err => err);
		return response;
	}

	async executeDeleteRequests(headers){
		const destination = BASE_URL + headers['url-destination'];
		const response = await axios.delete(destination, {headers})
		.then(res => res.data)
		.catch(err => err);
		return response;
	}

	async executePatchRequests(headers, body){
		const destination = BASE_URL + headers['url-destination'];
		const response = await axios.patch(destination, body, {headers})
		.then(res => res.data)
		.catch(err => err);
		return response
	}

}
