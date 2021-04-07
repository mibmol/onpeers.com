import { City, Country } from './country';

export type User = {
	id: number;
	isActive?: boolean;
	isPeer?: boolean;
	displayName?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	media?: any;
	country?: Country;
	city?: City;
	professions?: Profession;
};

 
export type Profession = {
	id: number,
	name: string
 }
