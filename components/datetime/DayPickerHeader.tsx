import { FC, memo, useMemo } from 'react';
import { default as cn } from 'classnames';
import { useCounter } from '../../utils/hooks';
import { ChevronDown, ChevronLeft, ChevronRight } from '../common/icons';
import { datetime, DateTime, listMonthNames } from '../../utils/dayjsUtils';
import { Button, IconButton } from '../common/buttons';
import Popover from '../common/radix-ui/popover';
import { IdProvider } from '@radix-ui/react-id';

type DayPickerHeaderProps = {
	actualYearMonth: DateTime;
	canPickMonth?: boolean;
	onSelectMonth?: (date: DateTime) => void;
	onClickPrev?: () => void;
	onClickNext?: () => void;
};

const LeftChevron = (
	<ChevronLeft sizes="w-5 h-5" className="text-gray-700" strokeWidth={3} />
);

const RightChevron = (
	<ChevronRight sizes="w-5 h-5" className="text-gray-700" strokeWidth={3} />
);

export const DayPickerHeader: FC<DayPickerHeaderProps> = memo(
	({ actualYearMonth, canPickMonth = true, onSelectMonth, onClickPrev, onClickNext }) => {
		return (
			<div className="flex-row-center">
				<IconButton icon={LeftChevron} onClick={onClickPrev} />
				<div className="w-44 flex-row-center">
					{canPickMonth ? (
						<IdProvider>
							<Popover.Root>
								<Popover.Trigger as="div">
									<Button
										className="font-bold btn-def px-1"
										text={actualYearMonth.format('MMMM YYYY')}
										iconPos="right"
										icon={
											canPickMonth && (
												<ChevronDown sizes="w-4 h-4" className="ml-1 text-gray-500" />
											)
										}
									/>
								</Popover.Trigger>
								<Popover.Content>
									<Popover.Arrow className="w-4 h-2 fill-current text-gray-800" />
									<MonthSelector
										onSelect={onSelectMonth}
										actualYearMonth={actualYearMonth}
									/>
								</Popover.Content>
							</Popover.Root>
						</IdProvider>
					) : (
						<div className="font-bold">{actualYearMonth.format('MMMM YYYY')}</div>
					)}
				</div>
				<IconButton icon={RightChevron} onClick={onClickNext} />
			</div>
		);
	},
);

type MonthSelectorProps = {
	actualYearMonth?: DateTime;
	onSelect: (date: DateTime) => void;
};

export const MonthSelector: FC<MonthSelectorProps> = ({ actualYearMonth, onSelect }) => {
	const [year, dec, inc] = useCounter(new Date().getFullYear());
	const months = useMemo(() => listMonthNames('MMM', year), [year]);

	return (
		<div className="bg-gray-800 text-white p-2 rounded-lg">
			<div className="flex flex-row justify-evenly items-center">
				<div className="p-1 cursor-pointer" onClick={() => dec()}>
					<ChevronLeft className="w-5 h-5" strokeWidth={3} />
				</div>
				<span className="text-sm font-semibold">{year}</span>
				<div className="p-1 cursor-pointer" onClick={() => inc()}>
					<ChevronRight className="w-5 h-5" strokeWidth={3} />
				</div>
			</div>
			<Popover.Close
				as={'div'}
				className="grid grid-cols-3 auto-rows-auto justify-items-center gap-1 p-2"
			>
				{months.map(({ date, label }) => {
					let my = date.format('MMMM YYYY');
					let isSelected = my === actualYearMonth.format('MMMM YYYY');
					let isNow = my === datetime().format('MMMM YYYY');
					return (
						<button
							key={date.unix()}
							onClick={() => onSelect(date)}
							className={cn(
								'cursor-pointer focus:outline-none border-2 border-transparent text-sm font-bold w-14 text-center py-1 rounded-md',
								{
									'bg-gray-200 text-gray-800 hover:bg-gray-200': isSelected,
									'hover:bg-gray-900': !isSelected,
									'border-gray-200': isNow,
								},
							)}
						>
							{label}
						</button>
					);
				})}
			</Popover.Close>
		</div>
	);
};
