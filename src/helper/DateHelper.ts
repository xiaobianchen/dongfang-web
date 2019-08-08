import moment from 'moment';

class DateHelper {

	public static FORMAT_DATE = 'YYYY-MM-DD';

	public static FORMAT_TIMESTAMP = 'x';

	public static FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss';

	public static FORMAT_TIME = 'HH:mm:ss';

	public static getDateString = (date: any) => {
		return moment(date).format(DateHelper.FORMAT_DATE);
	};

	public static getDateTimeString = (date: any) => {
		return moment(date).format(DateHelper.FORMAT_DATETIME);
	};

	public static getTimeString = (date: any) => {
		return moment(date).format(DateHelper.FORMAT_TIME);
	};

	public static getTimestamp = (date: any) => {
		return parseInt(moment(date).format(DateHelper.FORMAT_TIMESTAMP), 10);
	};

	public static getCustomStr = (date: any, format: string) => {
		return moment(date).format(format);
	};
}

export default DateHelper;

