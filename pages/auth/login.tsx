import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import LoginForm from '../../components/auth/LoginForm';
import { Assets } from '../../components/common/headers';

const LoginPage = ({}) => {
	const { t } = useTranslation('common');

	return (
		<>
			<Head>
				<title>Login to onpeers</title>
				<Assets />
			</Head>
			<div className="p-4">
				<LoginForm />
			</div>
		</>
	);
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const translations = await serverSideTranslations(locale, ['common', 'signin']);
	return { props: { ...translations } };
};

export default LoginPage;
