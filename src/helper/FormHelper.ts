import DateHelper from "@helper/DateHelper";

/**
 * 转换表单原始值
 * @param formData
 * @param {any} date
 * @param {any} array
 */
export const convertFormData = (formData = {}, { date = [], array = [] }: any) => {
	const keys = Object.keys(formData);
	const newFormData = {};
	keys.forEach(key => {
		if (date.indexOf(key) !== -1) {
			newFormData[key] = formData[key] && DateHelper.getTimestamp(formData[key]);
		} else if (array.indexOf(key) !== -1 && formData[key].length > 0) {
			newFormData[key] = formData[key] && formData[key][0];
		} else {
			newFormData[key] = formData[key];
		}
	});
	return newFormData;
};
