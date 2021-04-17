import { appWithTranslation } from 'next-i18next';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';
import { useConstant } from '../utils/hooks';
import { Provider } from 'react-redux';
import { makeStore } from '../components/redux/store';
import { ClientSideInitializer } from '../components/initializer';

function MyApp({ Component, pageProps }) {
	const store = useConstant(() => makeStore());

	return (
		<Provider store={store}>
			<ClientSideInitializer />
			<Component {...pageProps} />;
		</Provider>
	);
}

export default appWithTranslation(MyApp);
