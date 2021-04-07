import { appWithTranslation } from 'next-i18next';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
