import { FC, useMemo } from 'react';
import Select, { StylesConfig } from 'react-select';
import { TIMEZONES, Tz } from '../../utils/constants/tz';
import { randomString } from '../../utils/string';
import { GlobeIcon } from '../common/icons';

const styles: StylesConfig<any, any> = {
	control: (base) => ({ ...base, borderColor: '#CBD5E1' }),
};

export const TimeZoneSelector: FC<{ value?: Tz; onChange?: (tz: Tz) => void }> = ({
	value,
	onChange,
}) => {
	const instanceId = useMemo(() => randomString(), []);
	return (
		<div className="flex-row-center">
			<GlobeIcon strokeWidth={1.5} sizes="w-5" className="text-gray-600" />
			<Select
				className={'text-sm text-gray-800 w-72 font-semibold ml-2'}
				styles={styles}
				onChange={onChange}
				options={TIMEZONES}
				menuPlacement="top"
				instanceId={instanceId}
				value={value}
			/>
		</div>
	);
};
