import Utf8 from 'crypto-js/enc-utf8';
import { encrypt, decrypt } from 'crypto-js/aes';

export function encryptString(value: string, password: string): string {
	return encrypt(value, password).toString();
}

export function decryptString(cipher: string, password): string {
	return decrypt(cipher, password).toString(Utf8);
}

// export function waToArray({ words, sigBytes }): number[] {
// 	let i = 0;
// 	let result: number[] = [];
// 	for (const w of words) {
// 		result[i++] = (w & 0xff000000) >>> 24;
// 		result[i++] = (w & 0x00ff0000) >>> 16;
// 		result[i++] = (w & 0x0000ff00) >>> 8;
// 		result[i++] = w & 0x000000ff;
// 	}

// 	return result;
// }

// export function encryptString(password: string): string {
// 	let wa = HmacSHA256(password, password);
// 	wa = HmacSHA256(wa, password);
// 	return Buffer.from(waToArray(wa)).toString('base64');
// }
