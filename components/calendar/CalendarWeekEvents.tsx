import { FC } from 'react';
import { ScheduleRecur } from '../../api/models/schedule';
import { DateTime } from '../../utils/dayjsUtils';
import { EventRecur } from './hooks';

export type CalendarWeekEventsProps = {
	actual: DateTime;
	availability?: ScheduleRecur[];
	events?: EventRecur[];
};

export const CalendarWeekEvents: FC<CalendarWeekEventsProps> = ({ actual }) => {
	return <div></div>;
};
