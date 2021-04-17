import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { LoginCreds, signin } from '../../services/auth';
import { useAxiosPost } from '../../services/hooks';
import { TWSpinner } from '../common/icons';

const LoginForm: FC = () => {
	const { register, handleSubmit } = useForm<LoginCreds>();
	const { loading, error, call } = useAxiosPost<LoginCreds>(signin);

	return (
		<div>
			<form onSubmit={handleSubmit(call)} className="flex flex-col max-w-md">
				<input
					id="login_email"
					name="email"
					type="email"
					placeholder="email"
					aria-label="email address"
					className="input-indigo text-lg font-semibold bg-gray-100 placeholder-gray-500 px-4 py-2 mb-4"
					ref={register}
					required
				/>
				<input
					id="login_password"
					name="password"
					type="password"
					placeholder="password"
					aria-label="password"
					className="input-indigo text-lg font-semibold bg-gray-100 placeholder-gray-500 px-4 py-2 mb-4 "
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
						id="login_submit"
						type="submit"
						value={loading ? '' : 'Sign In'}
						className="w-full btn-indigo rounded py-3 cursor-pointer font-extrabold text-lg"
						aria-label="login"
					/>
				</div>
			</form>
		</div>
	);
};

export default LoginForm;
