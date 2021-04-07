// import { FC, useMemo, useState } from 'react';
// import { useTranslation, WithTranslation, withTranslation } from 'next-i18next';
// import { animated, useTransition } from 'react-spring';
// import { PencilAlt } from '../common/icons';
// import { Button } from '../common/buttons';
// import { Modal } from '../common/modal';
// import ScheduleEditor from './ScheduleEditor';
// import { DayPicker } from '../common/DayPicker';
// import { changeItemsTz, sortTimes } from './utils';
// import { datetime, isDateEqual } from '../../utils/dayjsUtils';
// import { LOCAL_TIMEZONE } from '../../utils/constants/tz';
// import { ScheduleRecur } from '../../api/models/schedule';
// import { TimeZoneSelector } from '../datetime/timezone';
// import { useLoadSchedule } from './hooks';
// import { useToggle } from 'react-use';

// type SchedulerProps = {} & WithTranslation;

// const Scheduler: FC<SchedulerProps> = ({ t }) => {
// 	const [showEditor, toggleShowEditor] = useToggle(false);
// 	const [tz, setTz] = useState(LOCAL_TIMEZONE);
// 	const [selectedDate, setSelectedDate] = useState(null);
// 	const { data, error, reload } = useLoadSchedule(datetime());

// 	const schedules = useMemo(() => changeItemsTz(data, tz.value), [data, tz.value]);
// 	const displaySchedules = schedules.filter((s) => isDateEqual(s.dtStart, selectedDate));
// 	return (
// 		<div className="p-4" id="scheduler">
// 			<div className="md:flex md:flex-row">
// 				<div>
// 					<CalendarHeader showEdit={!!selectedDate} onClickEdit={toggleShowEditor} />
// 					<DayPicker
// 						onSelectDate={setSelectedDate}
// 						onChangeMonth={reload}
// 						scheduleItems={schedules}
// 						loading={!data && !error}
// 						canSelectEmpty
// 					/>
// 					<TimeZoneSelector value={tz} onChange={setTz} />
// 				</div>
// 				<TimesList times={displaySchedules} />
// 			</div>
// 			<Modal
// 				isOpen={showEditor}
// 				onRequestClose={toggleShowEditor}
// 				role="application"
// 				className="absolute bg-white shadow-2xl object-center rounded-lg w-full md:w-auto"
// 				style={{
// 					overlay: { display: 'flex', justifyContent: 'center', marginTop: '5rem' },
// 				}}
// 			>
// 				<ScheduleEditor
// 					selectedDate={selectedDate}
// 					schedules={displaySchedules}
// 					onClose={toggleShowEditor}
// 					onDone={() => {}}
// 				/>
// 			</Modal>
// 		</div>
// 	);
// };

// const CalendarHeader: FC<{ showEdit: boolean; onClickEdit: () => void }> = ({
// 	showEdit,
// 	onClickEdit,
// }) => {
// 	const { t } = useTranslation();
// 	return (
// 		<div className="flex-row-between px-2 h-12">
// 			<h1 className="text-lg">{t('scheduler:title')}</h1>
// 			{showEdit && (
// 				<Button
// 					text={t('button.edit')}
// 					className="btn-indigo"
// 					icon={<PencilAlt sizes="w-5" />}
// 					onClick={onClickEdit}
// 				/>
// 			)}
// 		</div>
// 	);
// };

// const TimesList: FC<{ times?: ScheduleRecur[] }> = ({ times }) => {
// 	const { t } = useTranslation();
// 	const transitions = useTransition(
// 		sortTimes(times),
// 		(item) => item.dtStart.format('hh:mm a'),
// 		{
// 			from: { opacity: 0, transform: 'translateX(-100px)' },
// 			enter: { opacity: 1, transform: 'translateX(0px)' },
// 			leave: { opacity: 0, height: 0 },
// 		},
// 	);

// 	if (times.length < 1) {
// 		return (
// 			<div className="w-full md:w-60 md:ml-4">
// 				<div className="flex items-center mb-3 h-12"></div>
// 				<div className="flex-row-center h-full w-full pt-12">
// 					<span>{t('scheduler:no-dates')}</span>
// 				</div>
// 			</div>
// 		);
// 	}

// 	return (
// 		<div className="w-full md:w-60 md:ml-4">
// 			<ol className="flex flex-col h-96 w-full overflow-y-auto overflow-x-hidden overscroll-contain items-center">
// 				{transitions.map(({ item, key, props }) => {
// 					return (
// 						<animated.li className="w-full md:w-52" key={key} style={props}>
// 							<div className="text-center py-2 bg-blue-100 rounded-md mb-2">
// 								<span className="font-semibold text-sm text-blue-700">
// 									{item.dtStart.format('hh:mm a')} -{' '}
// 									{item.dtEnd.format('hh:mm a')}
// 								</span>
// 							</div>
// 						</animated.li>
// 					);
// 				})}
// 			</ol>
// 		</div>
// 	);
// };

// export default withTranslation(['common', 'datetime', 'scheduler'])(Scheduler);

export {};
