import { OpUnitType } from 'dayjs';
import { ScheduleRecur } from '../../services/models/schedule';
import { DateTime } from '../../utils/dayjsUtils';
import { changeTz } from '../../utils/tz';

export function sortTimes(times: ScheduleRecur[]): ScheduleRecur[] {
	return times.sort((a, b) => a.dtStart.unix() - b.dtStart.unix());
}

export function dateHasTimes(date: DateTime, scheduleItem: ScheduleRecur[]) {
	return !!scheduleItem.find(
		(s) => s.dtStart.month() === date.month() && s.dtStart.date() === date.date(),
	);
}

export function changeItemsTz(items: ScheduleRecur[], toTz: string): ScheduleRecur[] {
	if (!items) return [];
	return items.map((item) => ({
		...item,
		dtStart: changeTz(item.dtStart, toTz),
		dtEnd: changeTz(item.dtEnd, toTz),
	}));
}

export function listDateTimes(
	start: DateTime,
	end: DateTime,
	opt: { step: number; unit: OpUnitType } = { step: 15, unit: 'minutes' },
): DateTime[] {
	let result: DateTime[] = [start];
	if (start.isAfter(end)) return result;

	let current = start;
	while (current.isBefore(end)) {
		let temp = current.add(opt.step, opt.unit);
		result.push(temp);
		current = temp;
	}

	return result;
}

export type DurationOption = { value: number; label: string };

export const DURATIONS: DurationOption[] = [
	{ value: 15, label: 'duration.15' },
	{ value: 30, label: 'duration.30' },
	{ value: 45, label: 'duration.45' },
	{ value: 60, label: 'duration.1h' },
	{ value: 75, label: 'duration.1h15' },
	{ value: 90, label: 'duration.1h30' },
	{ value: 105, label: 'duration.1h45' },
	{ value: 120, label: 'duration.2h' },
	{ value: 135, label: 'duration.2h15' },
	{ value: 150, label: 'duration.2h30' },
	{ value: 175, label: 'duration.2h45' },
	{ value: 190, label: 'duration.3h' },
	{ value: 205, label: 'duration.3h15' },
	{ value: 220, label: 'duration.3h30' },
];
