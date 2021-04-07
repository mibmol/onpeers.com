import { WithTranslation, withTranslation } from 'next-i18next';
import { FC, useState } from 'react';
import { useTransition, animated } from 'react-spring';
import { ScheduleItem } from '../../api/models/schedule';
import { isDateTimeEqual } from '../../utils/dayjsUtils';
import { Button } from '../common/buttons';
import { sortTimes } from '../calendar/utils';

type IProps = {
	times?: ScheduleItem[];
	onSelect?: (item: ScheduleItem) => void;
} & WithTranslation;

const TimePicker: FC<IProps> = ({ t, times = [], onSelect = () => {} }) => {
	const [selected, setSelected] = useState<ScheduleItem>(null);
	const transitions = useTransition(
		sortTimes(times),
		(item) => item.dtstart.format('D hh:mm a'),
		{
			from: { opacity: 0, transform: 'translateX(-100px)' },
			enter: { opacity: 1, transform: 'translateX(0px)' },
			leave: { opacity: 0, height: 0 },
		},
	);

	return (
		<ol className="flex flex-col w-full md:w-64 overflow-y-auto overflow-x-hidden overscroll-contain items-center">
			{transitions.map(({ item, key, props }) => (
				<animated.li className="w-full md:w-56" key={key} style={props}>
					{selected !== null && isDateTimeEqual(selected.dtstart, item.dtstart) ? (
						<div className="flex flex-row mb-2">
							<Button
								className="btn-sky w-1/2 h-11"
								text={item.dtstart.format('hh:mm a')}
								ariaLabel={item.dtstart.format('hh:mm a')}
							/>
							<Button
								className="btn-indigo w-1/2 h-11 capitalize ml-2"
								text={t('button.confirm')}
								onClick={() => onSelect(item)}
								ariaLabel={t('button.confirm')}
							/>
						</div>
					) : (
						<Button
							className="btn-sky w-full h-11 mb-2"
							onClick={() => setSelected(item)}
							text={item.dtstart.format('hh:mm a')}
							ariaLabel={item.dtstart.format('hh:mm a')}
						/>
					)}
				</animated.li>
			))}
		</ol>
	);
};

export default withTranslation('common')(TimePicker);
