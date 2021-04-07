export class JSONFetchError extends Error{
	body: any
	status: number

	constructor(message: string, body: any, status: number){
		super(message)
		this.body = body
		this.status = status
	}
}