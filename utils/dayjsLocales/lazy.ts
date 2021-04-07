export const DateLocales = {
	en: () => import('./en'),
	es: () => import('./es'),
	it: () => import('./it'),
	de: () => import('./de'),
};

export async function loadDayJsLocale(alpha2code: string = 'en'): Promise<any> {
	let localeFn = DateLocales[alpha2code];
	if (!localeFn) {
		localeFn = DateLocales['en'];
	}

	return (await localeFn()).default;
}
