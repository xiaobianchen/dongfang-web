import { DatePicker } from 'antd';
import moment from 'moment';
import React from 'react';
import { DATE_FORMAT, DEFAULT_RANGE, FORMAT_TYPE } from './Const';

export interface WRangePickerProps {
	form: any;
	startKey: string;
	endKey: string;
	onChange?: (value: any) => void;
}

// 仅限Form中使用 对外申明value为时间戳
export class SRangePicker extends React.Component<WRangePickerProps, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			value: props.value,
			rangeProps: props
		};
	}

	public componentDidMount() {
		this.updateValue();
	}

	public componentWillReceiveProps(nextProps: any) {
		this.updateValue();
		this.setState({ rangeProps: nextProps });
	}

	public updateValue = () => {
		const { form, startKey, endKey } = this.props;
		const v = form.getFieldValue;
		const start = v(startKey);
		const end = v(endKey);
		const date = [];
		start && end && date.push(moment(start, 'x')) && date.push(moment(end, 'x'));
		this.setState({ date });
	};

	public onChange = (date: any, dateString: any) => {
		const { form, endKey } = this.props;
		if (date.length === 2) {
			form.setFieldsValue({
				[endKey]: parseInt(date[1].format('x'))
			});
			this.props.onChange && this.props.onChange(parseInt(date[0].format('x')));
		} else {
			form.setFieldsValue({
				[endKey]: undefined
			});
			this.props.onChange && this.props.onChange(undefined);
		}
	};

	public render() {
		const { form, endKey } = this.props;
		const { date, rangeProps } = this.state;
		const f = form.getFieldDecorator;
		f(endKey);
		return <DatePicker.RangePicker
			style={{ width: '100%' }}
			format={DATE_FORMAT[FORMAT_TYPE.DATE]}
			ranges={DEFAULT_RANGE}
			{...rangeProps}
			onChange={this.onChange}
			value={date}/>;
	}
}
