import ActionsBox from "@components/table/ActionsBox";
import 'ant-design-pro/lib/Ellipsis/style/index.less';
import React from 'react';

const Columns = ({ onEdit, onDelete }: any) => {
	return [{
		title: 'STKCODE',
		dataIndex: 'stkCode'
	}, {
		title: 'STKNAME',
		dataIndex: 'stkName',
	}, {
		title: 'STKMODEL',
		dataIndex: 'stkModel',
	},{
		title: 'STKUOM',
		dataIndex: 'stkUom',
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