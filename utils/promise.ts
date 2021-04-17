/**
 * Allow to execute a promise in a react component without side effects.
 * It doesn't cancel the request at all, just doesn't execute the resolve function when
 * the promise is done and the function cancel() is called.
 * It's usefull when performing an update state in the resolve function
 * but sometimes you need to unmount the component. This way, you can use the cancel() function as a cleanup
 * on componentWillUnmout() or on the cleanup function on your React.useEffect()
 */
export function makeCancelable(promise: Promise<any>, resolve: Function, reject: Function) {
	let hasCanceled_ = false;

	promise
		.then((val) => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)))
		.catch((error) => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error)));

	return {
		cancel() {
			hasCanceled_ = true;
		},
	};
}

export function sleep(ms: number = 1000): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * wrap await with try catch
 */
export async function to<T>(promise: Promise<T>): Promise<[T, Error]> {
	try {
		const result = await promise;
		return [result, null];
	} catch (error) {
		return [null, error];
	}
}
