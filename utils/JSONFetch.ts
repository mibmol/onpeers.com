/**
 * A dummy wrapper class for the fetch API
 * It handles the common task of parsing the json response
 * Author: @miguelquo
 */


type Header = Record<string, string>;

export type Interceptor = {
	fn: (data: ResponseData) => void;
	alias: string;
};

export type ResponseData = {
	body: any;
	status: number;
};

export class JSONFetch {
	baseURL: string;
	fetchOptions: RequestInit;
	headers: Header = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	};
	interceptors: Interceptor[] = [];

	constructor(baseURL: string = null, fetchOptions?: RequestInit) {
		if (baseURL !== null) {
			this.baseURL = baseURL;
		}
		if (fetchOptions !== null) {
			this.fetchOptions = fetchOptions;
		}
	}

	setHeader(name: string, value: string) {
		this.headers[name] = value;
	}

	setAuthToken(token: string, prefix = null) {
		let tkn;
		if (!prefix) tkn = token;
		else tkn = `${prefix} ${token}`;

		this.setHeader('Authorization', tkn);
	}

	removeAuthToken() {
		delete this.headers['Authorization'];
	}

	addInterceptor(interceptor: Interceptor) {
		this.interceptors.push(interceptor);
	}

	clearInterceptors() {
		this.interceptors = [];
	}

	removeInterceptor(alias: string) {
		this.interceptors = this.interceptors.filter((i) => i.alias !== alias);
	}

	async get(url: string, params: any): Promise<ResponseData> {
		let response = await fetch(this.clearUrl(url, params), {
			method: 'GET',
			headers: this.headers,
			...this.fetchOptions,
		});
		return await this.handleJSONResponse(response);
	}

	async post(url: string, body: any): Promise<ResponseData> {
		let response = await fetch(this.clearUrl(url), {
			method: 'POST',
			headers: this.headers,
			...this.fetchOptions,
			body: JSON.stringify(body),
		});
		return await this.handleJSONResponse(response);
	}

	async put(url, body): Promise<ResponseData> {
		let response = await fetch(this.clearUrl(url), {
			method: 'PUT',
			headers: this.headers,
			...this.fetchOptions,
			body: JSON.stringify(body),
		});

		return await this.handleJSONResponse(response);
	}

	async delete(url, params): Promise<ResponseData> {
		let response = await fetch(this.clearUrl(url, params), {
			method: 'DELETE',
			headers: this.headers,
			...this.fetchOptions,
		});
		return await this.handleJSONResponse(response);
	}

	async postForm(url, formObj): Promise<ResponseData> {
		let body = new FormData();
		Object.keys(formObj).forEach((key) => body.append(key, formObj[key]));
		let response = await fetch(this.clearUrl(url), {
			method: 'POST',
			headers: { ...this.headers, 'content-type': 'multipart/form-data' },
			...this.fetchOptions,
			body,
		});
		return await this.handleJSONResponse(response);
	}

	async handleJSONResponse(response: Response): Promise<ResponseData> {
		let contentType = response.headers.get('content-type');
		if (!contentType.includes('application/json')) {
			throw { body: { error: 'No JSON' }, status: response.status };
		}

		let body = await response.json();
		let data = { body, status: response.status };

		this.interceptors.forEach((interceptor) => {
			interceptor.fn(data);
		});

		if (response.status >= 400) {
			throw data;
		}
		return data;
	}

	clearUrl(url: string, params?: any) {
		let fullURL;
		if (this.baseURL) {
			fullURL = (this.baseURL + url).replace(/([^:]\/)\/+/g, '$1');
		} else {
			fullURL = url.replace(/([^:]\/)\/+/g, '$1');
		}

		if (params) return `${fullURL}?${new URLSearchParams(params).toString()}`;
		return fullURL;
	}
}
