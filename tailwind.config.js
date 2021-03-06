const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./pages/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				gray: colors.blueGray,
				greeno: '#00ff84',
				blacko: '#002333',
			},
			fontFamily: {
				serif: ['Libre\\ Baskerville'],
				sans: ['Lato', 'sans-serif'],
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ['hover', 'active', 'focus'],
			ringWidth: ['active', 'focus'],
			ringColor: ['hover', 'active', 'focus'],
			borderColor: ['hover'],
		},
	},
	plugins: [],
};
