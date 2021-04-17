import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import Axios from '../services/axios';
import { useOnce } from '../utils/hooks';
import { sleep } from '../utils/promise';
import { getStorageItem } from '../utils/storage';
import { HYDRATE, INITIAL_ROOT_STATE, persistMiddleware, RootState } from './redux/store';

export const ClientSideInitializer: FC = () => {
	const dispatch = useDispatch();

	useOnce(() => {
		const isServer = typeof window === 'undefined';
		if (isServer) return;

		console.log('should run on CLIENT ONLY');

		async function init() {
			await sleep(64);
			hydrateRedux(dispatch);
			initClientApp(dispatch);
		}
		init();
	});

	return <></>;
};

function hydrateRedux(dispatch: Dispatch) {
	let localReduxState: RootState = persistMiddleware.getState();

	let { authInfo } = localReduxState;
	if (!authInfo || !authInfo.loggedIn) {
		return dispatch({ type: HYDRATE, value: INITIAL_ROOT_STATE });
	}

	return dispatch({ type: HYDRATE, value: localReduxState });
}

function initClientApp(dispatch: Dispatch) {
	let jwtPayload = getStorageItem('payload');
	if (!jwtPayload || jwtPayload.length < 12) {
		console.log('JWT NOPE');
	}
	Axios.defaults.headers.common['Authorization'] = 'zxcvzxcv';
}
