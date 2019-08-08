import { Form } from 'antd';
import { find, forEach, isArray, isObject, keys, map } from 'lodash';
import moment from 'moment';

let uid = 0;

const hasItem = (list: any[], value: any) => {
	const n = find(list, (item: string) => {
		return value.indexOf(item) !== -1
	});
	return n != null;
};

const ret: any = (value: any, key: any, acc: any, keep: any, date: any, upload: any) => {
	if (keep && keep.indexOf(key) !== -1) {
		acc[key] = Form.createFormField({ value });
		return acc;
	}

	if (date && date.indexOf(key) !== -1) {
		if (isArray(value)) {
			acc[key] = Form.createFormField({
				value: value.map((item: any) => {
					return item != null ?
						item._isAMomentObject ? item : moment(item)
						: null;
				})
			});
		} else {
			acc[key] = Form.createFormField({
				value: value != null ?
					value._isAMomentObject ? value : moment(value)
					: null
			});
		}
		return acc;
	}

	if (upload && hasItem(upload, key)) {
		// todo: 处理上传
		if (value == null || value.length === 0) {
			acc[key] = Form.createFormField({
				value: []
			});
		} else {
			if (!isArray(value)) {
				value = [value];
			}

			acc[key] = Form.createFormField({
				value: map(value, val => {
					uid = uid + 1;
					return {
						uid,
						name: 'name.png',
						status: 'done',
						url: val,
					}
				})
			});
		}

		return acc;
	}

	if (isArray(value)) {
		return forEach(value, (val, idx) => ret(val, `${key}[${idx}]`, acc, keep, date, upload))
	}

	if (isObject(value)) {
		return forEach(value, (val, k) => ret(val, `${key}.${k}`, acc, keep, date, upload));
	}

	acc[key] = Form.createFormField({ value });
	return acc;
};

export const toRcFormData = (x: any, option: any = {}) => {
	const keep = option.keep;
	const date = option.date;
	const upload = option.upload;
	const acc = {};
	forEach(keys(x), key => ret(x[key], key, acc, keep, date, upload));
	return acc;
};
