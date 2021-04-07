import { OpUnitType } from 'dayjs';
import { useCallback, useState } from 'react';
import { DateTime } from '../../utils/dayjsUtils';

export function useDateTime(initial: DateTime) {
	// just to store the actual year and month. Ignore anything else
	const [actual, setActual] = useState<DateTime>(initial);

	const next = useCallback(
		(unit: OpUnitType = 'day') => {
			setActual(actual.add(1, unit));
		},
		[actual.toString()],
	);

	const prev = useCallback(
		(unit: OpUnitType = 'day') => {
			setActual(actual.subtract(1, unit));
		},
		[actual.toString()],
	);

	const set = useCallback((actual: DateTime) => setActual(actual), []);

	return { actual, next, prev, set };
}
