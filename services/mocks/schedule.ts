import { Schedule, ScheduleRecur } from '../models/schedule';
import { sleep } from '../../utils/promise';
import { getUTC } from '../../utils/date';
import { RRule, RRuleSet, rrulestr } from 'rrule';
import { datetime, DateTime } from '../../utils/dayjsUtils';
import { Event, EventType } from '../models/service';
import { SERVICES } from './service';

export async function getAvailability(
	peerId: number,
	yearMonth: DateTime,
): Promise<Schedule[]> {
	await sleep(500);

	let result: Schedule[] = [];
	let count = 0;

	let dtStart = datetime(new Date(2021, 3, 4, 8, 30)).utc();
	let dtEnd = datetime(new Date(2021, 3, 4, 11, 30)).utc(); // store HH:mm
	let dtUntil = null;

	let rule = new RRule({
		dtstart: getUTC(dtStart.toDate()),
		freq: RRule.WEEKLY,
	});

	result.push({
		id: count++,
		rrule: rule.toString(),
		peerId: 0,
		dtStart,
		dtEnd,
		dtUntil,
	});

	dtStart = datetime(new Date(2021, 3, 4, 13, 30)).utc();
	dtEnd = datetime(new Date(2021, 3, 4, 17, 30)).utc();
	dtUntil = datetime(new Date(2021, 5, 15)).utc();
	rule = new RRule({
		dtstart: getUTC(dtStart.toDate()),
		freq: RRule.WEEKLY,
		until: getUTC(dtStart.toDate()),
	});

	result.push({
		id: count++,
		rrule: rule.toString(),
		peerId: 0,
		dtStart,
		dtEnd,
		dtUntil,
	});

	dtStart = datetime(new Date(2021, 3, 5, 10, 0)).utc();
	dtEnd = datetime(new Date(2021, 3, 5, 16, 30)).utc();
	// until = getUTC(new Date(2021, 5, 15));
	rule = new RRule({
		dtstart: getUTC(dtStart.toDate()),
		freq: RRule.WEEKLY,
		// until,
	});

	result.push({
		id: count++,
		rrule: rule.toString(),
		peerId: 0,
		dtStart,
		dtEnd,
		dtUntil: null,
	});

	result = result.filter(
		(r) =>
			yearMonth.isSame(r.dtStart, 'month') ||
			yearMonth.isSame(r.dtUntil, 'month') ||
			yearMonth.isBetween(r.dtStart, r.dtUntil),
	);
	return result;
}

export async function getEvents(peerId: number, yearMonth: DateTime): Promise<Event[]> {
	await sleep(500);

	let result: Event[] = [];
	let count = 0;

	let dtStart = datetime(new Date(2021, 3, 4, 8, 0)).utc();
	let dtEnd = datetime(new Date(2021, 3, 4, 8, 45)).utc();
	let dtUntil = datetime(new Date()).utc();

	let rule = new RRule({
		dtstart: getUTC(dtStart.toDate()),
		freq: RRule.DAILY,
		count: 1,
	});

	result.push({
		id: count++,
		type: EventType.USER_APPOINTMENT,
		dtStart: dtStart,
		dtUntil: dtEnd,
		service: SERVICES[0],
		schedule: {
			id: count++,
			peerId: 0,
			rrule: rule.toString(),
			dtStart,
			dtEnd: dtEnd,
			dtUntil: dtEnd,
		},
	});

	dtStart = datetime(new Date(2021, 3, 4, 14, 30)).utc();
	dtEnd = datetime(new Date(2021, 3, 4, 15, 0)).utc();
	dtUntil = datetime(new Date(2021, 4, 12)).utc();

	rule = new RRule({
		dtstart: getUTC(dtStart.toDate()),
		freq: RRule.DAILY,
		until: getUTC(dtUntil.toDate()),
	});

	result.push({
		id: count++,
		type: EventType.USER_APPOINTMENT,
		dtStart: dtStart,
		dtUntil: dtUntil,
		service: SERVICES[1],
		schedule: {
			id: count++,
			peerId: 0,
			rrule: rule.toString(),
			dtStart,
			dtEnd: dtEnd,
			dtUntil: dtEnd,
		},
	});

	return result.filter(
		(r) =>
			yearMonth.isSame(r.dtStart, 'month') ||
			yearMonth.isSame(r.dtUntil, 'month') ||
			yearMonth.isBetween(r.dtStart, r.dtUntil),
	);
}

export function getScheduleRecurs(
	schedules: Schedule | Schedule[],
	yearMonth: DateTime,
): ScheduleRecur[] {
	let _schedules = Array.isArray(schedules) ? schedules : [schedules];
	let result: ScheduleRecur[] = [];
	let from = yearMonth.utc().date(1).subtract(1, 'day');
	let to = from.add(32, 'days');

	_schedules.forEach(({ id, rrule, dtEnd }) => {
		let rule = rrulestr(rrule, { forceset: true }) as RRuleSet;

		let recurrences = rule
			.between(from.toDate(), to.toDate())
			.map<ScheduleRecur>((ds) => {
				let dtStart = datetime()
					.utc()
					.year(ds.getFullYear())
					.month(ds.getMonth())
					.date(ds.getDate())
					.hour(ds.getHours())
					.minute(ds.getMinutes());
				return {
					dtStart,
					scheduleId: id,
					dtEnd: dtStart.hour(dtEnd.hour()).minute(dtEnd.minute()),
				};
			});

		result.push(...recurrences);
	});
	return result;
}
