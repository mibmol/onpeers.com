import { useForm } from 'react-hook-form';

let count = 0;

export function Formx() {
	const { register, handleSubmit, errors } = useForm(); // initialize the hook
	const onSubmit = (data) => {
		console.log(data);
	};
	console.log(count++);
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col max-w-md">
			<input name="firstname" className="bg-gray-100 px-4 py-2 mb-4" ref={register} />{' '}
			{/* register an input */}
			<input
				name="lastname"
				className="bg-gray-200 px-4 py-2 mb-4"
				ref={register({
					required: true,
				})}
			/>
			{errors.lastname && 'Last name is required.'}
			<input name="age" className="bg-gray-200 px-4 py-2" ref={register({ pattern: /\d+/ })} />
			{errors.age && 'Please enter number for age.'}
			<input type="submit" className="" />
		</form>
	);
}
