import { combineReducers, createStore, applyMiddleware, Reducer, Store } from 'redux';
import { authInfo, AuthInfo, authInfoDefault } from './authReducers';
import { userSettings, UserSettings, userSettingsDefault } from './settingsReducers';
import thunk from 'redux-thunk';
import { createPersistMiddleware } from './middlewares';

export const HYDRATE = '__REDUX_CLIENT_HYDRATE__';

export type MakeStore = () => Store<RootState>;
export type RootState = {
	authInfo: AuthInfo;
	userSettings: UserSettings;
};

export const INITIAL_ROOT_STATE: RootState = {
	authInfo: authInfoDefault,
	userSettings: userSettingsDefault,
};

const combinedReducers = combineReducers({ authInfo, userSettings });

const reducer: Reducer<RootState> = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state,
			...action.value,
		};
		return nextState;
	} else {
		return combinedReducers(state, action);
	}
};

export const persistMiddleware = createPersistMiddleware({
	storageKey: 'state',
});

export const makeStore: MakeStore = () => {
	const isServer = typeof window === 'undefined';

	if (isServer) {
		return createStore(reducer);
	}

	return createStore(reducer, applyMiddleware(thunk, persistMiddleware.middleware));
};
