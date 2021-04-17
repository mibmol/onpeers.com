import Head from 'next/head';
import Link from 'next/link';
import { Assets } from '../components/common/headers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { datetime } from '../utils/dayjsUtils';
import { loadDayJsLocale } from '../utils/dayjsLocales/hardcoded';
import { useMemo } from 'react';
// import { Calendar } from '../components/calendar/Calendar';

export default function Home() {
	const { t, i18n } = useTranslation('common');

	useMemo(() => {
		datetime.locale(loadDayJsLocale(i18n.language));
	}, [i18n.language]);

	return (
		<>
			<Head>
				<title>Onpeers</title>
				{/* : on demand consulting and mentoring */}
				<Assets />
			</Head>
			<Link href="/" locale={i18n.language === 'en' ? 'es' : 'en'}>
				<strong>{t('button.accept')}</strong>
			</Link>
			<div className="flex justify-center items-center w-screen h-screen">
				<span className="text-gray-800 text-3xl font-medium">Curious?</span>
			</div>
			{/* 
				<div className="flex p-4">
					<Calendar />
				</div>
			*/}
		</>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, [
		'common',
		'datetime',
		'scheduler',
	]);
	return { props: { ...translations } };
};
