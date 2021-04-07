import { DateTime } from '../../utils/dayjsUtils';
import { Schedule } from './schedule';

export type Currency = {
	id: number;
	code: string;
	name: string;
	symbol: string;
	isSupportedInApp: boolean;
};

export enum EventType {
	USER_APPOINTMENT = 'user_appointment',
	STREAM = 'stream',
}

export type Event = { type: EventType } & (ServiceAppointment | Stream);

export type Service = {
	id: number;
	peerId: number;
	name: string;
	description: string;
	maxDuration: number; // minutes
	maxUsers?: number;
	createdAt?: Date;
	price?: number;
	currency?: Currency;
	forCountryIds?: number[];
};

export type ServiceAppointment = {
	id?: number;
	peerId?: number;
	service?: Service;
	users?: UserServiceAppointment[];
	schedule?: Schedule;
	meetingId?: string;
	meetingCode?: string;
	dtStart?: DateTime; // same from schedule
	dtUntil?: DateTime;
	startedAt?: DateTime;
	endedAt?: DateTime;
	isDone?: boolean;
	created_at?: DateTime;
};

export type UserServiceAppointment = {
	userId: number;
	userEmail: string; // for users without an account
	serviceAppointmentId: number;
	isMain: boolean; // who will pay the appointment
};

export enum StreamType {
	LIVE_ONCE = 'live_once',
	LIVE_SERIES = 'live_series',
	RECORDED_CLASS = 'recorded_class',
}

export type Stream = {
	id: number;
	peerId?: number;
	coHostsIds?: any[];
	type?: StreamType;
	scheduleId?: number;
	dt_start?: DateTime; // same from schedule
	dt_until?: DateTime;
	title?: string;
	description?: string;
	max_participants?: number; // 0 means no limit
	max_duration?: number;
	is_free?: boolean;
	price?: number;
	price_currency_id?: number;
	tags?: any[]; // tags_ids
	media_poster_url?: string;
	media_video_intro_url?: string;
	media_recorded_video_url?: string;
	meeting_room?: string; // jitzi
	meeting_room_code?: string; // 128
	language_id?: number;
};

export type UserStreamAppointment = {
	id: number;
	user_id?: number;
	user_email?: string; // for users without an account
	stream_id?: number;
	dt_start?: DateTime; // same from schedule
	started_at?: DateTime;
	ended_at?: DateTime;
};
