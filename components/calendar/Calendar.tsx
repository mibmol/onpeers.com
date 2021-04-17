import { FC, memo, useState } from 'react';
import Select from 'react-select';
import { DateTime, datetime } from '../../utils/dayjsUtils';
import { Button, IconButton } from '../common/buttons';
import { ChevronDown, ChevronLeft, ChevronRight } from '../common/icons';
import { Modal } from '../common/modal';
import DropdownMenu from '../common/radix-ui/dropdown';
import { IdProvider } from '@radix-ui/react-id';
import { DayPicker } from '../datetime/DayPicker';
import { useDateTime } from '../datetime/hooks';
import AvailabilityEditor from './AvailabilityEditor';
import { CalendarDayEvents } from './CalendarDayEvents';
import { CalendarWeekEvents } from './CalendarWeekEvents';
import EventEditor from './EventEditor';
import { loadAvailability, loadEvents } from './hooks';

enum DisplayTypes {
	DAY = 'day',
	WEEK = 'week',
	MONTH = 'month',
}

export type CalendarProps = {};

export const Calendar: FC<CalendarProps> = () => {
	const { actual, set, prev, next } = useDateTime(datetime());
	const [displayAs, setDisplayAs] = useState<DisplayTypes>(DisplayTypes.DAY);
	const { data: availability, error } = loadAvailability(actual);
	const { data: events, error: errorEvents } = loadEvents(actual);
	const [showModal, setShowModal] = useState('none');

	return (
		<div className="w-full">
			<CalendarHeader
				actual={actual}
				displayAs={displayAs}
				onChangeDisplay={(v) => setDisplayAs(v.value)}
				onClickPrev={() => prev(displayAs)}
				onClickNext={() => next(displayAs)}
				onSetActual={set}
				showAvalilabilityEditor={() => setShowModal('avalilability')}
				showEventsEditor={() => setShowModal('events')}
			/>
			<div className="w-full">
				{displayAs === DisplayTypes.DAY && (
					<CalendarDayEvents
						actual={actual}
						onSelectDate={set}
						availability={availability || []}
						events={events || []}
					/>
				)}
				{displayAs === DisplayTypes.WEEK && (
					<CalendarWeekEvents
						actual={actual}
						availability={availability || []}
						events={events || []}
					/>
				)}
			</div>
			<Modal
				isOpen={showModal === 'avalilability'}
				role="application"
				onRequestClose={() => setShowModal('none')}
			>
				<AvailabilityEditor />
			</Modal>
			<Modal
				isOpen={showModal === 'events'}
				role="application"
				onRequestClose={() => setShowModal('none')}
			>
				<EventEditor />
			</Modal>
		</div>
	);
};

const DisplayOptions = [
	{ value: 'day', label: 'day' },
	{ value: 'week', label: 'week' },
];

const CalendarHeader: FC<{
	actual: DateTime;
	displayAs: DisplayTypes;
	onChangeDisplay: (v: any) => void;
	onClickPrev: () => void;
	onClickNext: () => void;
	onSetActual: (dt: DateTime) => void;
	showAvalilabilityEditor: () => void;
	showEventsEditor: () => void;
}> = ({
	actual,
	displayAs,
	onChangeDisplay,
	onClickPrev,
	onClickNext,
	onSetActual,
	showAvalilabilityEditor,
	showEventsEditor,
}) => {
	return (
		<div className="flex flex-col items-start md:flex-row md:justify-between">
			<div className="w-full md:flex md:flex-row md:items-center">
				<Select
					instanceId="calendar-display-as"
					className="w-full sm:w-32 sm:mr-6 font-semibold text-gray-700"
					options={DisplayOptions}
					value={{ value: displayAs as string, label: displayAs as string }}
					onChange={onChangeDisplay}
					isSearchable={false}
				/>
				{displayAs === DisplayTypes.WEEK && (
					<div className="flex flex-row">
						<IconButton
							className="border border-gray-300"
							roundClass="rounded-l"
							onClick={onClickPrev}
							icon={
								<ChevronLeft
									sizes="w-5 h-5"
									className="text-gray-700"
									strokeWidth={2.5}
								/>
							}
						/>
						<WeekPicker actual={actual} onSetActual={onSetActual} />
						<IconButton
							onClick={onClickNext}
							className="border border-gray-300"
							roundClass="rounded-r"
							icon={
								<ChevronRight
									sizes="w-5 h-5"
									className="text-gray-700"
									strokeWidth={2.5}
								/>
							}
						/>
					</div>
				)}
			</div>
			<div className="mt-4 mx-auto md:mt-0 md:mx-0 md:w-auto md:flex">
				<Button
					className="btn-gray px-5 w-40"
					text="Edit availability"
					onClick={showAvalilabilityEditor}
				/>
				<Button
					className="btn-indigo px-5 w-36 ml-4"
					text="Create event"
					onClick={showEventsEditor}
				/>
			</div>
		</div>
	);
};

const WeekPicker: FC<{ actual: DateTime; onSetActual: (a: DateTime) => void }> = memo(
	({ actual, onSetActual }) => (
		<IdProvider>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger className="flex-row-center btn-def px-4 border-t border-b border-gray-300">
					<span>{actual.startOf('week').format('MMM DD')}</span>
					<span className="mx-1">-</span>
					<span>{actual.endOf('week').format('MMM DD')}</span>
					<ChevronDown sizes="w-4 h-4 ml-1" />
				</DropdownMenu.Trigger>
				<DropdownMenu.Content className="rounded shadow-center-lg" align="center">
					<DropdownMenu.Arrow
						className="w-8 h-4 top-2 text-gray-200 stroke-current"
						style={{ fill: 'white' }}
					/>
					<DayPicker
						className="-top-1 border-white bg-white"
						defaultSelectedDate={actual}
						onSelectDate={onSetActual}
						showMonthPicker={false}
						daysWapperComponent={DropdownMenu.Item}
						canSelectEmpty
					/>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</IdProvider>
	),
);
