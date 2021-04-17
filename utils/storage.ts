function isServer() {
	return typeof window === 'undefined';
}

export function getStorageItem(key: string): string {
	if (isServer()) return null;
	return localStorage.getItem(key);
}

export function setStorageItem(key: string, value: any): boolean {
	if (isServer()) return false;
	let stringData: string;

	if (typeof value !== 'string') {
		stringData = JSON.stringify(value);
	} else {
		stringData = value;
	}

	try {
		localStorage.setItem(key, stringData);
		return true;
	} catch (error) {
		return false;
	}
}

export async function setStorageItemAsync(key: string, value: any): Promise<boolean> {
	return setStorageItem(key, value);
}
