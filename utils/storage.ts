export function getStorageItem<T>(key: string): T {
	let stringData = localStorage.getItem(key);
	if (!stringData) {
		return null;
	}
	return JSON.parse(stringData) as T;
}

export function setStorageItem(key: string, value: any): boolean {
	let stringData = JSON.stringify(value);
	try {
		localStorage.setItem(key, stringData);
		return true;
	} catch (error) {
		return false;
	}
}
