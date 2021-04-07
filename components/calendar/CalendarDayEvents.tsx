import { FC, Fragment, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getScheduleRecurs } from '../../api/mocks/schedule';
import { ScheduleRecur } from '../../api/models/schedule';
import { Event } from '../../api/models/service';
import { DateTime } from '../../utils/dayjsUtils';
import { HSeparator } from '../common/separators';
import { DayPicker } from '../datetime/DayPicker';
import { EventRecur } from './hooks';
import { listDateTimes } from './utils';

enum EventType {
	Appointment = 'appointment',
	Event = 'event',
}

export type CalendarDayEventsProps = {
	actual: DateTime;
	availability?: ScheduleRecur[];
	events?: EventRecur[];
	onSelectDate?: (d: DateTime) => void;
};

export const CalendarDayEvents: FC<CalendarDayEventsProps> = ({
	actual,
	availability,
	events,
	onSelectDate,
}) => (
	<div className="md:flex md:flex-row mt-4">
		<div>
			<DayPicker
				onChangeMonth={onSelectDate}
				onSelectDate={onSelectDate}
				canSelectEmpty
			/>
		</div>
		<div className="flex-grow mt-4 md:mt-0 md:ml-8 text-center">
			<HSeparator className="mb-2" />
			<span className="text-gray-700 font-bold">
				{actual.format('dddd')} {actual.format('LL')}
			</span>
			<HSeparator className="mt-2" />
			<div className="mt-4">
				<EventsListDD actual={actual} availability={availability} events={events} />
			</div>
		</div>
	</div>
);

const EventsListDD: FC<{
	actual: DateTime;
	availability?: ScheduleRecur[];
	events?: EventRecur[];
}> = ({ actual, events, availability }) => {

	const times = useMemo(
		() => listDateTimes(actual.hour(0).minute(0), actual.hour(23).minute(45)),
		[actual.format('YYYY-MM-DD')],
	);
	
	const timesWithAvailability = times.map((t) => {
		let isAvailable = !!availability.find((a) =>
			t.isBetween(a.dtStart, a.dtEnd, 'minutes', '[]'),
		);
		return { available: isAvailable, time: t };
	});

	const eventsInDay = events.filter((er) => er.dtStart.isSame(actual, 'day'));

	return (
		<DndProvider backend={HTML5Backend}>
			<div
				className="flex flex-col relative overflow-y-auto overflow-x-hidden overscroll-contain w-full"
				style={{ display: 'grid', gridTemplateColumns: '3rem auto', height: '52rem' }}
			>
				{eventsInDay.map((e) => (
					<DragBoxEvent key={e.dtStart.toString()} eventRecur={e} />
				))}
				{timesWithAvailability.map(({ time, available }) => (
					<Fragment key={time.toString()}>
						<span className="text-gray-700 font-semibold text-sm">
							{time.minute() === 0 ? time.format('h A') : ''}
						</span>
						<DropBoxTime
							key={time.format('DD HH-mm')}
							val={time.format('LT')}
							available={available}
						/>
					</Fragment>
				))}
			</div>
		</DndProvider>
	);
};

function getRowRange(dtStart: DateTime, dtEnd: DateTime) {
	let rowStart = 4 * dtStart.hour() + (dtStart.minute() % 4) - 1;
	let rowEnd = 4 * dtEnd.hour() + (dtEnd.minute() % 4);
	return { rowStart, rowEnd };
}

const DragBoxEvent: FC<{ eventRecur: EventRecur }> = ({ eventRecur }) => {
	const [{ isDragging }, dragRef, prev] = useDrag(
		() => ({
			type: EventType.Event,
			item: eventRecur,
			collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
		}),
		[],
	);
	const { rowStart, rowEnd } = getRowRange(eventRecur.dtStart, eventRecur.dtEnd);
	return (
		<div
			ref={dragRef}
			className="absolute w-full bg-red-200 h-full cursor-pointer z-20"
			style={{ gridArea: `${rowStart} / 2 / ${rowEnd} / 3` }}
		></div>
	);
};

const DropBoxTime = ({ val, available }) => {
	const [{ isOver, canDrop }, dropRef] = useDrop(
		() => ({
			accept: [EventType.Appointment, EventType.Event],
			canDrop: () => true,
			drop: (item) => console.log(item),
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[val],
	);

	return (
		<div>
			<HSeparator />
			<div ref={dropRef} className="relative w-full h-7 flex flex-row">
				<div className={`w-full h-full ${available ? '' : 'bg-gray-100'}`}></div>
				{isOver && <Overlay className={canDrop ? 'bg-blue-500' : 'bg-red-500'} />}
			</div>
		</div>
	);
};

const Overlay = ({ className = '' }) => (
	<div className={`absolute-fit ${className}`}></div>
);
