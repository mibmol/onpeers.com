import { randomInt } from "./number";

export const ALPHANUMERIC: string =
	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function randomString(length: number = 6): string {
	let count = Math.floor(length);
	if (count <= 0) return '';
	let result = '';
	while (count-- > 0) {
		let index = randomInt(ALPHANUMERIC.length);
		result += ALPHANUMERIC.charAt(index);
	}
	return result;
}

export function capitalize(s: string): string{
	let _s = s.trim().toLowerCase()
	return _s.charAt(0).toUpperCase() + _s.slice(1) 
}
