import { AxiosError, AxiosResponse } from 'axios';
import { useSetState } from 'react-use';

export function useAxiosPost<TBody>(fetchFn: (data: TBody) => Promise<any>) {
	const [state, setState] = useSetState<{ loading: boolean; error: AxiosError }>({
		loading: false,
		error: null,
	});

	const call = (data: TBody) => {
		if (state.loading) return;
		setState({ loading: true, error: null });

		fetchFn(data)
			.then((res: AxiosResponse) => {
				setState({
					error: null,
					loading: false,
				});
			})
			.catch((err: AxiosError) => {
				setState({
					error: err,
					loading: false,
				});
			});
	};

	return { ...state, call };
}
