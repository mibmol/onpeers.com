import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { signup, SignupData } from '../../services/auth';
import { useAxiosPost } from '../../services/hooks';
import { UserRole } from '../../services/models/user';
import { TWSpinner } from '../common/icons';

const SignupForm: FC = () => {
	const { t } = useTranslation('common');
	const { register, handleSubmit } = useForm<SignupData>();
	const route = useRouter();
	const { loading, error, call } = useAxiosPost(signup);

	const submit = (data: SignupData) => {
		let isPeer = route.query.role === UserRole.PEER;
		call({ ...data, isPeer });
	};

	return (
		<div>
			<form onSubmit={handleSubmit(submit)} className="flex flex-col max-w-md">
				<input
					id="signup_name"
					name="name"
					placeholder="full name"
					aria-label="full address"
					className="input-indigo text-lg font-semibold bg-gray-100 placeholder-gray-500 px-4 py-2 mb-4"
					ref={register}
					minLength={6}
					maxLength={255}
					required
				/>
				<input
					id="signup_email"
					name="email"
					type="email"
					placeholder="email"
					aria-label="email address"
					className="input-indigo text-lg font-semibold bg-gray-100 placeholder-gray-500 px-4 py-2 mb-4"
					ref={register}
					required
				/>
				<input
					id="signup_password"
					name="password"
					type="password"
					placeholder="password"
					aria-label="password"
					className="input-indigo text-lg font-semibold bg-gray-100 placeholder-gray-500 px-4 py-2 mb-4 "
					minLength={8}
					ref={register}
					required
				/>
				<input
					id="signup_passwordCheck"
					name="passwordCheck"
					type="password"
					autoComplete="signup_password"
					placeholder="re-enter password"
					aria-label="re-enter password"
					className="w-full input-indigo text-lg font-semibold bg-gray-100 placeholder-gray-500 px-4 py-2 mb-4 "
					ref={register}
					required
				/>
				<div className="w-full relative mt-4">
					{loading && (
						<div className="absolute-fit">
							<TWSpinner size="w-5 h-5" color="text-white" animating />
						</div>
					)}
					<input
						id="signup_submit"
						type="submit"
						value={loading ? '' : 'Create account'}
						className="w-full btn-indigo rounded py-3 cursor-pointer font-extrabold text-lg"
						aria-label="Create account"
					/>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;
