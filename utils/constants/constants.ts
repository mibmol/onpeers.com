export function doDirtyShit() {
	if (process.env.NODE_ENV !== 'development') {
		console.log = () => {};
		console.error = () => {};
		console.warn = () => {};
	}
}

export const REST_API_URL: string =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://api.onpeers.com/';

export const ENCRYPTOR_KEY: string = 'MIIEowIBAAKA2LCcVqUelTOc6TwslUAm8vxnoCAQEt3hhlv8FjvjmZGqJ';

