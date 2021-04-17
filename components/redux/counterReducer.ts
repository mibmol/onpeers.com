import { Reducer } from 'redux';

const initialState: number = 0;

export const counter: Reducer<number> = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD':
			return state + 1;
		case 'SUB':
			return state - 1;
		default:
			return state;
	}
};
