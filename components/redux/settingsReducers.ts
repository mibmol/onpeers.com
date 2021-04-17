import { Reducer } from 'redux';
import { LOCAL_TIMEZONE_RAW } from '../../utils/constants/tz';

export type UserSettings = {
	tz: string;
	theme: 'dark' | 'light';
};

export const userSettingsDefault: UserSettings = {
	theme: 'light',
	tz: LOCAL_TIMEZONE_RAW,
};

export const userSettings: Reducer<UserSettings> = (state = userSettingsDefault, action) => {
	switch (action.type) {
		default:
			return state;
	}
};
