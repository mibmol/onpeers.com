// import { WithTranslation, withTranslation } from 'next-i18next';
// import { Component } from 'react';
// import { ScheduleItem } from '../../api/models/schedule';
// import { isDateEqual } from '../../utils/dayjsUtils';
// import { getScheduleItems, getSchedules } from '../../api/mocks/schedule';
// import { Calendar } from './Calendar';
// import TimePicker from './TimePicker';
// import { changeItemsTz } from './utils';
// import { GlobeIcon } from '../common/icons';
// import Select from 'react-select';
// import { LOCAL_TIMEZONE, TIMEZONES, Tz } from '../../utils/constants/tz';
// import { datetime, DateTime } from '../../utils/dayjsUtils';

// type IProps = {} & WithTranslation;
// type IState = {
// 	selectedDate: DateTime;
// 	scheduleItems: ScheduleItem[];
// 	loading: boolean;
// 	error: { msg: string };
// 	tz: Tz;
// };

// class DateTimeSelector extends Component<IProps, IState> {
// 	state: IState = {
// 		selectedDate: null,
// 		scheduleItems: [],
// 		loading: false,
// 		error: null,
// 		tz: LOCAL_TIMEZONE,
// 	};

// 	componentDidMount() {
// 		this.loadSchedule(datetime());
// 	}

// 	loadSchedule = (yearMonth) => {
// 		this.setState({
// 			loading: true,
// 			error: null,
// 			selectedDate: null,
// 		});
// 		const { tz } = this.state;
// 		getSchedules(0, yearMonth)
// 			.then((res) => {
// 				if (res.length > 0) {
// 					this.setState({
// 						scheduleItems: changeItemsTz(getScheduleItems(res, yearMonth), tz.value),
// 						loading: false,
// 						error: null,
// 					});
// 				} else {
// 					this.setState({ error: { msg: 'No dates left this month' }, loading: false });
// 				}
// 			})
// 			.catch((err) => {
// 				this.setState({ error: { msg: err.toString() }, loading: false });
// 			});
// 	};

// 	onSelectDate = (date: DateTime) => {
// 		this.setState({
// 			selectedDate: date,
// 		});
// 	};

// 	onSelectTime = (schedule: ScheduleItem) => {
// 		console.log('UTC', schedule.dtstart.toISOString());
// 	};

// 	selectTz = (newTz: Tz) => {
// 		const { scheduleItems } = this.state;
// 		this.setState({
// 			tz: newTz,
// 			scheduleItems: changeItemsTz(scheduleItems, newTz.value),
// 		});
// 	};

// 	render() {
// 		const { selectedDate, scheduleItems, loading, error, tz } = this.state;
// 		const timesToPick = scheduleItems.filter((s) => isDateEqual(s.dtstart, selectedDate));
// 		const { t } = this.props;
// 		return (
// 			<div className="p-4">
// 				<h1 className="text-lg p-4">{t('datePicker.title')}</h1>
// 				<div className="md:flex md:flex-row">
// 					<div>
// 						<Calendar
// 							onSelectDate={this.onSelectDate}
// 							onChangeMonth={this.loadSchedule}
// 							scheduleItems={scheduleItems}
// 							canSelectEmpty={false}
// 							loading={loading}
// 							error={error}
// 						/>
// 						<div className="flex-row-center mt-3">
// 							<GlobeIcon strokeWidth={1.5} sizes="w-5" className="text-gray-600" />
// 							<Select
// 								className={'text-sm text-gray-800 w-72 font-semibold ml-2'}
// 								styles={{ control: (base) => ({ ...base, borderColor: '#CBD5E1' }) }}
// 								onChange={this.selectTz}
// 								options={TIMEZONES}
// 								menuPlacement="top"
// 								instanceId="tz"
// 								value={tz}
// 							/>
// 						</div>
// 					</div>

// 					{timesToPick.length > 0 && error === null && (
// 						<div className="ml-2">
// 							<h1 className="text-base pb-2 pl-4">{t('timePicker.title')}</h1>
// 							<TimePicker times={timesToPick} onSelect={this.onSelectTime} />
// 						</div>
// 					)}
// 				</div>
// 			</div>
// 		);
// 	}
// }

// export default withTranslation('datetime')(DateTimeSelector);

export const a = {};
