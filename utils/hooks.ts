import { useState, useEffect, EffectCallback } from 'react';


export function useOnce(effect: EffectCallback) {
	useEffect(effect, []);
}

export function useCounter(
	initialValue: number = 0,
): [number, (delta?: number) => void, (delta?: number) => void, (value?: number) => void] {
	const [value, setValue] = useState<number>(initialValue);

	const dec = (delta: number = 1) => setValue((v) => v - delta);
	const inc = (delta: number = 1) => setValue((v) => v + delta);
	const set = (value: number) => setValue(() => value);

	return [value, dec, inc, set];
}

