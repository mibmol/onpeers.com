import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { arrayFill } from './array';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(isBetween);

export const datetime = dayjs;
export type DateTime = Dayjs;

/**
 *
 * Compare year, month and day
 * Ignore milis and time zone
 *
 */
export function isDateEqual(a: DateTime, b: DateTime): boolean {
	if (!a || !b) return false;
	return a.year() === b.year() && a.month() === b.month() && a.date() === b.date();
}

/**
 * Compare date and time
 * Ignore milis and time zone
 */
export function isDateTimeEqual(a: DateTime, b: DateTime): boolean {
	if (!a || !b) return false;
	return (
		a.year() === b.year() &&
		a.month() === b.month() &&
		a.date() === b.date() &&
		a.hour() === b.hour() &&
		a.minute() === b.minute()
	);
}

// get the date number [0-30] for monday in the current week
export function mondayNumber(date: DateTime): number {
	return date.date() - date.day();
}

export function listDaysNames(pattern: string = 'dd'): string[] {
	let date = datetime();
	let monday = mondayNumber(date);

	let days: string[] = arrayFill(7).map((_, index) => {
		date.date(monday + index);
		return date.date(monday + index).format(pattern);
	});

	return days;
}

export function listMonthNames(
	pattern: string = 'MMMM',
	year: number = datetime().year(),
): { date: DateTime; label: string }[] {
	let dates: DateTime[] = arrayFill(12).map((_, index) => {
		return datetime().year(year).month(index);
	});

	return dates.map((date) => ({
		date: date,
		label: date.format(pattern),
	}));
}
