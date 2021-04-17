export const MINUTES_A_HOUR = 60
export const MINUTES_A_DAY = MINUTES_A_HOUR * 24
export const MINUTES_A_WEEK = MINUTES_A_DAY * 7



// returns the day number (first week) for date = 1
export function firstDayMonth(year: number, month: number): number {
	let dateCopy = new Date(year, month, 1);
	dateCopy.setDate(1);
	return dateCopy.getDay();
}

export function daysInMonth(date: Date): number {
	let dateCopy = new Date(date.getTime());
	dateCopy.setDate(32);
	return 32 - dateCopy.getDate();
}


export function getUTC(date: Date = null): Date {
	let d = date || new Date();
	return new Date(
		d.getUTCFullYear(),
		d.getUTCMonth(),
		d.getUTCDate(),
		d.getUTCHours(),
		d.getUTCMinutes(),
		d.getUTCSeconds(),
	);
}

