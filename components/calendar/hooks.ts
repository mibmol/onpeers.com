import { useEffect } from 'react';
import { useSetState } from 'react-use';
import { getScheduleRecurs, getAvailability, getEvents } from '../../services/mocks/schedule';
import { ScheduleRecur } from '../../services/models/schedule';
import { Event } from '../../services/models/service';
import { DateTime } from '../../utils/dayjsUtils';

export function loadAvailability(yearMonth: DateTime) {
	const [state, setState] = useSetState<{ data: ScheduleRecur[]; error: any }>({
		data: null,
		error: null,
	});

	useEffect(() => {
		setState({ data: null, error: null });
		getAvailability(0, yearMonth)
			.then((res) => {
				if (res.length > 0) {
					let items = getScheduleRecurs(res, yearMonth);
					setState({
						data: items,
						error: null,
					});
				} else {
					setState({ error: { msg: 'No availability for this month' }, data: null });
				}
			})
			.catch((err) => {
				console.error(err);
				setState({ error: { msg: err }, data: null });
			});
	}, [yearMonth.format('YYYY-MM')]);

	return state;
}

export type EventRecur = {
	event: Event;
	dtStart: DateTime; // start time for the recurrence
	dtEnd: DateTime;
};
export function loadEvents(yearMonth: DateTime) {
	const [state, setState] = useSetState<{
		data: EventRecur[];
		error: any;
	}>({
		data: null,
		error: null,
	});

	useEffect(() => {
		console.log('reload');
		setState({ data: null, error: null });
		getEvents(0, yearMonth)
			.then((res) => {
				if (res.length > 0) {
					let eventsWithRecurs = [];
					console.log('events: ', res);
					res.forEach((ev) => {
						let recurs = getScheduleRecurs(ev.schedule, yearMonth);

						console.log('events recurs: ', recurs);
						let er = recurs.map(({ dtStart, dtEnd }) => ({
							event: ev,
							dtStart,
							dtEnd,
						}));
						eventsWithRecurs.push(...er);
					});
					setState({
						data: eventsWithRecurs,
						error: null,
					});
				} else {
					setState({ error: { msg: 'No availability for this month' }, data: null });
				}
			})
			.catch((err) => {
				console.error(err);
				setState({ error: { msg: err }, data: null });
			});
	}, [yearMonth.format('YYYY-MM')]);

	return state;
}
