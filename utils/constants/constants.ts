export function doDirtyShit() {
	if (process && process.env.NODE_ENV !== 'development') {
		console.log = () => {};
		console.error = () => {};
		console.warn = () => {};
	}
}

export const REST_API_URL: string =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.onpeers.com/';


