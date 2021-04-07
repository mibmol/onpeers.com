// import { withTranslation, WithTranslation } from 'next-i18next';
// import { FC, Fragment, memo, useState } from 'react';
// import { ScheduleRecur } from '../../api/models/schedule';
// import {  DateTime } from '../../utils/dayjsUtils';
// import { Button, IconButton } from '../common/buttons';
// import {
// 	ArrowNarrowRight,
// 	CalendarIcon,
// 	ClockIcon,
// 	CloseIcon,
// 	MinusIcon,
// 	PlusIcon,
// } from '../common/icons';
// import { default as cn } from 'classnames';
// import { useScheduleRecurs } from './hooks';
// import { TimePicker } from '../common/timepicker';
// import { HSeparator } from '../common/separators';
// import { randomString } from '../../utils/string';

// type EditorProps = {
// 	selectedDate: DateTime;
// 	schedules: ScheduleRecur[];
// 	onDone?: () => void;
// 	onClose?: () => void;
// } & WithTranslation;

// const ScheduleEditor: FC<EditorProps> = ({
// 	selectedDate,
// 	schedules,
// 	onDone,
// 	onClose,
// 	t,
// }) => {
// 	const { recurs: timeRanges, set, pop, push } = useScheduleRecurs(schedules);
// 	// console.log(
// 	// 	newSchedules.map((s) => ({
// 	// 		sId: s.scheduleId,
// 	// 		dtStart: `${s.dtStart.toDate()}`,
// 	// 		dtEnd: ` ${s.dtEnd.toDate()}`,
// 	// 	})),
// 	// );

// 	return (
// 		<div>
// 			<Header onClose={onClose} date={selectedDate} t={t} />
// 			<TimeRangeList timeRanges={timeRanges} onChange={set} />
// 		</div>
// 	);
// };

// const Header: FC<any> = memo(({ onClose, date, t }) => (
// 	<Fragment>
// 		<div className="flex fle-row justify-between py-2 px-4">
// 			<div className="flex-row-center">
// 				<CalendarIcon strokeWidth={2} className="text-gray-600 mr-2" />
// 				<span className="ml-1 mt-1 capitalize">{t('scheduler:startdate')}:</span>
// 				<span className="ml-2 mt-1 font-bold text-gray-800">{date.format('LL')}</span>
// 			</div>
// 			<IconButton icon={<CloseIcon sizes="w-5" />} onClick={onClose} />
// 		</div>
// 		<HSeparator />
// 	</Fragment>
// ));

// const TimeRangeList: FC<{
// 	timeRanges: ScheduleRecur[];
// 	onChange?: (timeRange: ScheduleRecur) => void;
// 	onAdd?: () => void;
// 	onRemove?: () => void;
// }> = ({ timeRanges, onChange, onAdd, onRemove }) => {
// 	const [addingNew, setAddingNew] = useState(false);
// 	if (timeRanges.length < 1) {
// 		return (
// 			<div className="flex justify-center p-4">
// 				<IconButton icon={<PlusIcon sizes="w-5" />} />
// 			</div>
// 		);
// 	}
// 	return (
// 		<ul className="flex-col-center p-4">
// 			{timeRanges.map((tr, index) => {
// 				return (
// 					<Fragment key={tr.dtStart.unix()}>
// 						<div className="flex flex-row items-center">
// 							<TimeRange
// 								timeRange={tr}
// 								prev={timeRanges[index - 1]}
// 								next={timeRanges[index + 1]}
// 								onChange={onChange}
// 							/>
// 							{!addingNew && (
// 								<>
// 									<IconButton
// 										className="p-1 btn-pink mr-2"
// 										icon={<MinusIcon sizes="w-5" />}
// 									/>
// 									<IconButton
// 										className="p-1 btn-sky"
// 										icon={<PlusIcon sizes="w-5" />}
// 									/>
// 								</>
// 							)}
// 						</div>
// 						{addingNew && (
// 							<NewTimeRange
// 								prev={timeRanges[index - 1]}
// 								next={timeRanges[index + 1]}
// 							/>
// 						)}
// 					</Fragment>
// 				);
// 			})}
// 		</ul>
// 	);
// };

// const TimeRange: FC<{
// 	timeRange: ScheduleRecur;
// 	prev?: ScheduleRecur;
// 	next?: ScheduleRecur;
// 	onChange?: (value: ScheduleRecur) => void;
// }> = ({ timeRange, prev, next, onChange }) => {
// 	const { dtStart, dtEnd } = timeRange;

// 	const prevEnd = prev ? prev.dtEnd : undefined;
// 	const nextStart = next ? next.dtStart : undefined;

// 	return (
// 		<div className="flex-row-center">
// 			<ClockIcon sizes="w-5" className="mr-1 text-gray-600" />
// 			<div className="relative flex-row-center w-48 h-12">
// 				<div className="absolute left-0">
// 					<TimePicker
// 						initial={{ hour: dtStart.hour(), minute: dtStart.minute() }}
// 						onChange={(time) =>
// 							onChange({
// 								...timeRange,
// 								dtStart: timeRange.dtStart.hour(time.hour).minute(time.minute),
// 							})
// 						}
// 					/>
// 				</div>
// 				<span className="absolute" style={{ left: '36%' }}>
// 					<ArrowNarrowRight sizes="w-5" strokeWidth={1.5} />
// 				</span>
// 				<div className="absolute right-0">
// 					<TimePicker
// 						initial={{ hour: dtEnd.hour(), minute: dtEnd.minute() }}
// 						onChange={(time) =>
// 							onChange({
// 								...timeRange,
// 								dtEnd: timeRange.dtEnd.hour(time.hour).minute(time.minute),
// 							})
// 						}
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// const NewTimeRange: FC<{
// 	prev: ScheduleRecur;
// 	next: ScheduleRecur;
// 	onDone?: (newSchedule: ScheduleRecur) => void;
// }> = ({ prev, next, onDone }) => {
// 	const [newTimeRange, setNewTimeRange] = useState<ScheduleRecur>({
// 		scheduleId: 'new_' + randomString(16),
// 		dtStart: prev.dtEnd,
// 		dtEnd: next.dtStart,
// 	});

// 	return (
// 		<div className="flex flex-row items-center">
// 			<TimeRange timeRange={newTimeRange} prev={prev} next={next} />
// 			<Button text="accept" />
// 		</div>
// 	);
// };

// export default withTranslation('scheduler')(ScheduleEditor);
export {};
