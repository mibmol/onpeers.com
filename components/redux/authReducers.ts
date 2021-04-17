
import { Reducer } from 'redux';

// actions
export const login = (userData: any) => ({
	type: 'LOGIN',
	value: userData,
});

export const logout = () => ({
	type: 'LOGOUT',
});

export type AuthInfo = {
	loggedIn: boolean;
	data: any;
};

export const authInfoDefault: AuthInfo = {
	loggedIn: false,
	data: null,
};

export const authInfo: Reducer<AuthInfo> = (state = authInfoDefault, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { loggedIn: true, data: action.value };
		case 'LOGOUT':
			return authInfoDefault;
		default:
			return state;
	}
};

