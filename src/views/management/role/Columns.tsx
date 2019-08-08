import { RoleStatus, RoleStatusMap } from "@common/enum/RoleStatus";
import { RoleTypeMap } from "@common/enum/RoleType";
import ActionsBox from "@components/table/ActionsBox";
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import 'ant-design-pro/lib/Ellipsis/style/index.less';
import { Switch } from "antd";
import { DateUtils } from "pekon-wx-common/lib";
import React from 'react';

const Columns = ({ onEdit, onDelete }: any) => {
	return [{
		title: '角色名称',
		dataIndex: 'name'
	}, {
		title: '角色描述',
		dataIndex: 'memo',
		width: 200,
		render: text => <Ellipsis tooltip={true} lines={2}>{text}</Ellipsis>
	}, {
		title: '类型',
		dataIndex: 'type',
		render: text => RoleTypeMap[text]
	}, {
		title: '创建时间',
		dataIndex: 'createTime',
		render: text => text && DateUtils.getDateTimeString(text)
	}, {
		title: '更新时间',
		dataIndex: 'updateTime',
		render: text => text && DateUtils.getDateTimeString(text)
	}, {
		title: '状态',
		dataIndex: 'status',
		render: text => <Switch size={'small'}
														checked={text === RoleStatus.open}
														checkedChildren={RoleStatusMap[RoleStatus.open]}
														unCheckedChildren={RoleStatusMap[RoleStatus.close]}/>
	}, {
		title: '操作',
		dataIndex: 'actions',
		render: (text, record) => <ActionsBox>
			<a onClick={() => onEdit(record)}>编辑</a>
			<a onClick={() => onDelete(record)}>删除</a>
		</ActionsBox>
	}]
};

export default Columns