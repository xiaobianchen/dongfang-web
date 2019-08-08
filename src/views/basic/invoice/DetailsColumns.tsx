import ActionsBox from "@components/table/ActionsBox";
import 'ant-design-pro/lib/Ellipsis/style/index.less';
import React from 'react';

const Columns = ({ onEdit, onOver, start = 0 }: any) => {
	return [{
		title: 'NO.',
		dataIndex: 'NO.',
		render: (text, record, index) => start + index + 1
	}, {
		title: 'IMPA',
		dataIndex: 'impa'
	}, {
		title: 'Description',
		dataIndex: 'description'
	}, {
		title: 'Remark',
		dataIndex: 'remark'
	}, {
		title: 'UNIT',
		dataIndex: 'unit'
	}, {
		title: 'QTY',
		dataIndex: 'qty'
	}, {
		title: <span>Unit Price<br/>(RMB)</span>,
		dataIndex: 'qty'
	}, {
		title: <span>Amount<br/>(RMB)</span>,
		dataIndex: 'unitPrice'
	}, {
		title: 'QTY',
		dataIndex: 'amount'
	}, {
		title: '操作',
		dataIndex: 'actions',
		render: (text, record, index) => <ActionsBox>
			{!record.status && <a onClick={() => onOver(record, start+index)}>完成</a>}
			<a onClick={() => onEdit(record)}>查看配货详情</a>
		</ActionsBox>
	}]
};

export default Columns