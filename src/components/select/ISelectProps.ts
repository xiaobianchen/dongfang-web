import { Method } from "@common/enum/Method";
import { SelectProps } from "antd/lib/select";

export interface ISelectProps extends SelectProps {
	dataSource?: any[];// 数据源

	localDataSource?: boolean;// 数据源来源

	requestUrl?: string;// 请求数据URL

	requestMethod?: Method;// 请求数据方式

	requestParams?: object;// 请求数据参数

	labelKey?: string;// labelKey

	valueKey?: string;// valueKey
}
