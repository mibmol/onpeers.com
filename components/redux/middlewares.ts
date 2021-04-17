import { Dispatch } from 'react';
import { AnyAction, Store } from 'redux';
import DebouncePromise from 'awesome-debounce-promise';
import { getStorageItem, setStorageItemAsync } from '../../utils/storage';

type PersistMiddlewareOpts = { storageKey?: string };

export function createPersistMiddleware(opt: PersistMiddlewareOpts = {}) {
	const { storageKey } = opt;
	const key = storageKey || 'state';

	async function saveToLocal(data: any): Promise<void> {
		await setStorageItemAsync(key, JSON.stringify(data));
	}

	const updateStorageState = DebouncePromise((state) => saveToLocal(state), 300);

	function middleware(store: Store) {
		return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
			let result = next(action);
			updateStorageState(store.getState());
			return result;
		};
	}

	function getState() {
		let val: any;
		let stringVal = getStorageItem(key);

		try {
			val = JSON.parse(stringVal);
		} catch (error) {
			return {};
		}
		return val;
	}

	return { middleware, getState };
}
