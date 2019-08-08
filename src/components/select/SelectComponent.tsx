import { Method } from "@common/enum/Method";
import AjaxUtils from "@core/http";
import { resultHelper } from "@core/http/helper";
import { Select } from 'antd';
import React from 'react';
import { ISelectProps } from './ISelectProps';

class SelectComponent extends React.Component<ISelectProps, any> {

	public static defaultProps = {
		placeholder: '请选择',
		dataSource: [],
		labelKey: 'label',
		valueKey: 'value',
		requestMethod: Method.GET,
		requestUrl: '',
		localDataSource: false,
		requestParams: {},
		style: {
			width: '100%'
		}
	};

	constructor(props: any) {
		super(props);
		this.state = {
			dataSource: props.localDataSource ? props.dataSource || [] : []
		};
	}

	public componentDidMount() {
		const { localDataSource } = this.props;
		if (!localDataSource) {
			this.loadDataSource();
		}
	}

	public componentWillReceiveProps(nextProps?: any) {
		if (nextProps.dataSource && nextProps.localDataSource) {
			this.state = {
				dataSource: nextProps.dataSource
			};
		}
	}

	public loadDataSource = () => {
		const { requestUrl = '', requestParams, requestMethod } = this.props;
		if (requestMethod === Method.POST) {
			AjaxUtils.post(requestUrl, requestParams)
				.then(resultHelper)
				.then(data => this.setState({ dataSource: data }));
		} else {
			AjaxUtils.get(requestUrl, requestParams)
				.then(resultHelper)
				.then(data => this.setState({ dataSource: data }));
		}

	};

	public render() {
		const { dataSource } = this.state;
		const props = this.props;
		const { labelKey, valueKey } = props;
		return <Select {...props}>
			{dataSource.map((item: any, idx: number) => {
					return <Select.Option key={item[valueKey]} value={item[valueKey]}>{item[labelKey]}</Select.Option>;
				}
			)}
		</Select>;
	}
}

export default SelectComponent;
