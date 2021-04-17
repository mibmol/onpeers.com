import { getStorageItem } from '../../utils/storage';

export function getKey() {
	let key = getStorageItem('sk');
	if (!key) return 'default';
}
