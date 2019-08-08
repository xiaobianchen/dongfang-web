import { RoleStatus, RoleStatusMap } from "@common/enum/RoleStatus";
import ActionsBox from "@components/table/ActionsBox";
import { Popover, Switch } from "antd";
import { DateUtils } from "pekon-wx-common/lib";
import React from 'react';

const QRCode = require('qrcode.react');

const Columns = ({ onEdit, onDelete }: any) => {
	return [{
		title: '用户名称',
		dataIndex: 'name'
	}, {
		title: '登录账号',
		dataIndex: 'account',
	}, {
		title: '手机号',
		dataIndex: 'mobile',
	}, {
		title: '所属角色',
		dataIndex: 'roleName'
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
			<Popover content={<QRCode value={record.qrcodeUrl}/>}>
				<a>二维码</a>&#12288;
			</Popover>
			<a onClick={() => onEdit(record)}>编辑</a>
			<a onClick={() => onDelete(record)}>删除</a>
		</ActionsBox>
	}]
};

export default Columns