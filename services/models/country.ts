export type Country = {
	id: number;
	name: string;
	alpha2code: string;
	alpha3code: string;
	region: string;
	subregion: string;
	demonym: string;
	capital: string;
	translations: any;
	isSupported: boolean;
};

export type City = {
	id: number;
	name: string;
	nameAscii: string;
	lat: number;
	lng: number;
	countryAlpha2code: string;
	countryAlpha3code: string;
};

export type AppLanguages = {
	id: number;
	name: string;
	native_name: string;
	code2: string;
	code3: string;
	isSupported: boolean;
};
