import { DateTime, datetime } from './dayjsUtils';
import timezone from 'dayjs/plugin/timezone';

datetime.extend(timezone);

function getHHmm(time: string) {
	let [h, m] = time.split(':');
	if (!m) {
		if (h.length < 2) return `0${h}:00`;
		else return `${h}:00`;
	} else {
		if (h.length < 2) return `0${h}:00`;
		else return `${h}:${m}`;
	}
}

export function getGMT(date: Date, tz: string, localeCode: string = 'en'): string {
	let s = new Intl.DateTimeFormat(localeCode, { timeStyle: 'long', timeZone: tz } as any)
		.format(date)
		.split(' ');
	let all = s[s.length - 1];
	if (all.includes('+')) {
		let time = all.split('+')[1];
		return `GMT+${getHHmm(time)}`;
	}
	if (all.includes('-')) {
		let time = all.split('-')[1];
		return `GMT-${getHHmm(time)}`;
	}
	return all;
}

export function changeTz(dt: DateTime, toTz: string): DateTime {
	let _toTz = toTz === 'UTC' ? 'Europe/Lisbon' : toTz;
	// let _fromTz = fromTz === 'UTC' ? 'Europe/Lisbon' : fromTz;
	return dt.tz(_toTz);
}
