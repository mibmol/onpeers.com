import { ComponentType, FC, useEffect, useMemo, useState } from 'react';
import { DayPickerHeader } from './DayPickerHeader';
import { arrayFill } from '../../utils/array';
import { dateHasTimes } from '../calendar/utils';
import { datetime, DateTime, isDateEqual, listDaysNames } from '../../utils/dayjsUtils';
import { default as cn } from 'classnames';
import { ScheduleRecur } from '../../services/models/schedule';
import { TWSpinner } from '../common/icons';
import { useDateTime } from './hooks';

type DayPickerProps = {
	loading?: boolean;
	className?: string;
	defaultSelectedDate?: DateTime;
	scheduleItems?: ScheduleRecur[];
	canSelectEmpty?: boolean;
	error?: { msg: string };
	showMonthPicker?: boolean;
	onSelectDate?: (date: DateTime) => void;
	onChangeMonth?: (date: DateTime) => void;
	daysWapperComponent?: ComponentType<
		{} & { disabled?: boolean; textValue: any; onSelect?: (e: any) => void }
	>;
};

const DummyWrapper = ({ children, onSelect, className }) => (
	<div className={className} onClick={onSelect}>
		{children}
	</div>
);

export const DayPicker: FC<DayPickerProps> = ({
	loading = false,
	className = 'border-gray-200',
	defaultSelectedDate = datetime(),
	scheduleItems = [],
	canSelectEmpty = false,
	showMonthPicker = true,
	error,
	onSelectDate,
	onChangeMonth,
	daysWapperComponent = DummyWrapper,
}) => {
	const { actual: actualYearMonth, next, prev, set } = useDateTime(defaultSelectedDate);
	const [selectedDate, setSelectedDate] = useState<DateTime>(defaultSelectedDate);

	useEffect(() => {
		if (onChangeMonth) {
			onChangeMonth(actualYearMonth);
		}
	}, [actualYearMonth.toString()]);

	useEffect(() => {
		if (onSelectDate) {
			onSelectDate(selectedDate);
		}
	}, [selectedDate?.toString()]);

	const daysNames = useMemo(renderDayNames, []);
	const emptyBlocks = useMemo(() => renderEmptyBlock(actualYearMonth), [
		actualYearMonth.toString(),
	]);
	const days = useMemo(() => getDaysProps(actualYearMonth, selectedDate, scheduleItems), [
		actualYearMonth,
		selectedDate,
		scheduleItems,
	]);

	const DayWrapper = daysWapperComponent;
	return (
		<div
			className={`relative items-center p-4 md:w-96 border border-2 rounded-md ${className}`}
		>
			<div>
				<div className="mb-4">
					<DayPickerHeader
						actualYearMonth={actualYearMonth}
						canPickMonth={showMonthPicker}
						onSelectMonth={set}
						onClickPrev={() => prev('month')}
						onClickNext={() => next('month')}
					/>
				</div>
				<div className="relative">
					<div className="grid grid-cols-7 justify-items-center gap-3 mb-4">
						{daysNames}
					</div>
					<div className="grid grid-cols-7 auto-rows-auto justify-items-center gap-3">
						{emptyBlocks}
						{days.map(({ date, selected, hasTimes }) => (
							<DayItem
								key={date.toString()}
								WrapperComponent={DayWrapper}
								onClick={() => setSelectedDate(date)}
								date={date}
								isSelected={selected}
								hasTimes={hasTimes}
								canSelect={hasTimes || canSelectEmpty}
							/>
						))}
					</div>
					{!!error && <ErrorMsg msg={error.msg} />}
				</div>
			</div>
			{loading && <LoadingMsg />}
		</div>
	);
};

function renderDayNames() {
	return listDaysNames().map((dayName, i) => (
		<span className="text-sm text-gray-700 font-bold capitalize" key={i + dayName}>
			{dayName}
		</span>
	));
}
function renderEmptyBlock(actual: DateTime) {
	let elems = [];
	let count = actual.startOf('month').day();
	while (count-- > 0) {
		elems.push(<div key={'empty' + count}></div>);
	}
	return elems;
}
function getDaysProps(
	actualYearMonth: DateTime,
	selectedDate: DateTime,
	scheduleItems: ScheduleRecur[],
) {
	return arrayFill(actualYearMonth.daysInMonth()).map((_, index) => {
		let date = actualYearMonth.clone().date(index + 1);
		let hasTimes = dateHasTimes(date, scheduleItems);
		let selected = isDateEqual(date, selectedDate);
		return { date, hasTimes, selected };
	});
}

const DayItem: FC<{
	onClick: () => void;
	date: DateTime;
	hasTimes?: boolean;
	isSelected?: boolean;
	canSelect?: boolean;
	WrapperComponent?: any;
}> = ({ date, onClick, hasTimes, isSelected, canSelect, WrapperComponent }) => {
	if (!canSelect) {
		return (
			<div className="flex-row-center rounded-full w-9 h-9 select-none">
				<b className="text-gray-400 font-semibold">{date.date()}</b>
			</div>
		);
	}

	return (
		<WrapperComponent
			onSelect={onClick}
			className={cn('flex-row-center cursor-pointer rounded-full w-9 h-9', {
				'bg-blue-600': isSelected,
				'hover:bg-blue-100': hasTimes && !isSelected,
				'hover:bg-gray-100': !hasTimes && !isSelected,
			})}
		>
			{hasTimes ? (
				<span className={`font-bold ${isSelected ? 'text-white' : 'text-blue-700 '}`}>
					{date.date()}
				</span>
			) : (
				<span className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-600'}`}>
					{date.date()}
				</span>
			)}
		</WrapperComponent>
	);
};

const ErrorMsg = ({ msg }) => (
	<div className="absolute-fit bg-white opacity-70 rounded-md">
		<div className="bg-pink-100 px-4 py-2 mt-2 rounded-md text-pink-700 font-semibold">
			{msg}
		</div>
	</div>
);

const LoadingMsg = () => (
	<div className="absolute-fit bg-white opacity-60 rounded-md">
		<TWSpinner size="h-6 w-6" animating />
	</div>
);
