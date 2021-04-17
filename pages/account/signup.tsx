import Head from 'next/head';
import SignupForm from '../../components/auth/SignupForm';
import { Assets } from '../../components/common/headers';

const Signup = () => {

	return (
		<>
			<Head>
				<title>Signup to onpeers</title>
				<Assets />
			</Head>
			<div className="p-4">
				<SignupForm />
			</div>
		</>
	);
};

export default Signup;
