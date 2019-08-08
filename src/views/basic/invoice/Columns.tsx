import ActionsBox from "@components/table/ActionsBox";
import 'ant-design-pro/lib/Ellipsis/style/index.less';
import { Tooltip } from "antd";
import { DateUtils } from "pekon-wx-common/lib";
import React from 'react';

const Columns = ({ onEdit, onRemark, onDelete,onExpress }: any) => {
	return [{
		title: '订单号',
		dataIndex: 'orderNumber'
	}, {
		title: '创建时间',
		dataIndex: 'createTime',
		render: text => text && DateUtils.getDateTimeString(text)
	}, {
		title: '更新时间',
		dataIndex: 'updateTime',
		render: text => text && DateUtils.getDateTimeString(text)
	}, {
		title: '配货人',
		dataIndex: 'creator',
	}, {
		title: '收货人',
		dataIndex: 'receiver',
	}, {
		title: '订单状态',
		dataIndex: 'status',
		render: text => !!text ? '配货完成' : '配货中'
	},{
		title: '快递公司',
		dataIndex: 'expressName',
	},{
		title: '快递单号',
		dataIndex: 'expressId',
	}, {
		title: '备注',
		dataIndex: 'remark',
		render: text => {
			if (!text) {
				return null;
			}
			const isLongTag = text.length > 20;
			const tagElem = (
				<span>
					{isLongTag ? `${text.slice(0, 20)}...` : text}
				</span>
			);
			return isLongTag ? <Tooltip title={text}>{tagElem}</Tooltip> : tagElem;
		}
	}, {
		title: '操作',
		dataIndex: 'actions',
		width: 280,
		render: (text, record) => <ActionsBox>
			<a onClick={() => onEdit(record)}>查看订单详情</a>
			<a onClick={() => onRemark(record)}>备注</a>
			<a onClick={() => onDelete(record)}>删除</a>
			<a onClick={() => onExpress(record)}>配置快递信息</a>
		</ActionsBox>
	}]
};

export default Columns