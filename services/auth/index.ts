import Axios from '../axios';

export type SignupData = {
	name: string;
	email: string;
	password: string;
	isPeer: boolean;
};

export function signup(data: SignupData) {
	delete data['passwordCheck'];
	return Axios.post('auth/signup', { data });
}

export type LoginCreds = {
	email: string;
	password: string;
};
export function signin(creds: LoginCreds) {
	return Axios.post('auth/login', { data: creds });
}
