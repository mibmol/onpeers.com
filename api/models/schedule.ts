import { DateTime } from '../../utils/dayjsUtils';

export enum ScheduleType {
	AVAILABILITY = 'availability',
	EVENT = 'event',
}

export type Schedule = {
	id: number;
	type?: ScheduleType;
	peerId: number;
	dtStart: DateTime;
	dtEnd: DateTime;
	dtUntil?: DateTime;
	rrule: string;
	exdates?: DateTime[]
};

export type ScheduleRecur = {
	scheduleId: number | string;
	dtStart: DateTime;
	dtEnd: DateTime;
};
