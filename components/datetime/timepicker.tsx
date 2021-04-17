import { FC, useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { SelectComponents } from 'react-select/src/components';
import { arrayFill } from '../../utils/array';
import { MINUTES_A_HOUR } from '../../utils/date';

export type HHmm = {
	hour: number;
	minute: number;
};

const HOURS = arrayFill(24).map((_, index) => index);
const MINUTES = arrayFill(MINUTES_A_HOUR / 5).map((_, index) => index * 5);

const HOURS_OPTIONS = HOURS.map((h) => ({
	label: h < 10 ? '0' + h : h.toString(),
	value: h,
}));
const MINUTES_OPTIONS = MINUTES.map((m) => ({
	label: m < 10 ? '0' + m : m.toString(),
	value: m,
}));

export type TimePickerProps = {
	initial: HHmm;
	onChange?: (value: HHmm) => void;
	max?: HHmm;
	min?: HHmm;
};

const customComponents: Partial<SelectComponents<any, any>> = {
	DropdownIndicator: () => null,
	IndicatorSeparator: () => null,
};
const customStyles: StylesConfig<any, any> = {
	control: (provided, state) => ({
		...provided,
		padding: 1,
		width: 28,
		height: 28,
		zIndex: 20,
		borderColor: state.isFocused ? provided.borderColor : 'transparent',
	}),
	menu: (provided) => ({ ...provided, zIndex: 30 }),
	valueContainer: () => ({ width: '100%' }),
};

export const TimePicker: FC<TimePickerProps> = ({
	initial = { hour: 0, minute: 0 },
	min = { hour: 0, minute: 0 },
	max = { hour: 23, minute: 59 },
	onChange,
}) => {
	const [selected, setSelected] = useState<HHmm>(initial);

	useEffect(() => {
		onChange && onChange(selected);
	}, [selected]);

	const hourOptions = HOURS_OPTIONS.filter(
		({ value }) => value >= min.hour && value <= max.hour,
	);
	const minuteOptions =
		selected.hour > min.hour && selected.hour < max.hour
			? MINUTES_OPTIONS
			: MINUTES_OPTIONS.filter(
					({ value }) => value >= min.minute && value <= max.minute,
			  );

	return (
		<div className="relative flex-row-center w-25 h-12">
			<div className="absolute left-0">
				<Select
					className="w-16 font-semibold"
					isSearchable={false}
					styles={customStyles}
					options={hourOptions}
					components={customComponents}
					onChange={({ value }) => {
						setSelected({ ...selected, hour: value });
					}}
					defaultValue={{
						label:
							selected.hour < 10 ? '0' + selected.hour : selected.hour.toString(),
						value: selected.hour,
					}}
				/>
			</div>
			<span className="absolute left-7 z-10 text-lg font-bold">:</span>
			<div className="absolute right-0">
				<Select
					className="w-16 font-semibold"
					isSearchable={false}
					styles={customStyles}
					options={minuteOptions}
					components={customComponents}
					onChange={({ value }) => {
						setSelected({ ...selected, minute: value });
					}}
					defaultValue={{
						label:
							selected.minute < 10
								? '0' + selected.minute
								: selected.minute.toString(),
						value: selected.minute,
					}}
				/>
			</div>
		</div>
	);
};
