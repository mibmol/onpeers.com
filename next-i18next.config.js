const path = require('path');

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'es', 'de', 'it'],
	},
	localePath: path.resolve('./public/locales'),
	defaultNS: 'common',
	localeExtension: 'json'
};
