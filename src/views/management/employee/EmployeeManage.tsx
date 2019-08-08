import { $EmployeeMV } from "@common/mv/$EmployeeMV";
import ContentBox from "@components/content/ContentBox";
import { autowired } from "@core/ioc";
import Columns from "@views/management/employee/Columns";
import EditForm from "@views/management/employee/EditForm";
import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { observer } from "mobx-react";
import React from "react";

const { Item } = Form;

@observer
class EmployeeManage extends React.Component<any, any> {

	@autowired($EmployeeMV)
	public mv: $EmployeeMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		this.mv.init();
		this.mv.onSearch({ keyword: '' });
	}

	public handleSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			this.mv.onSearch(values);
		});
	};

	public handleReset = () => {
		this.props.form.resetFields();
		this.mv.onSearch({ keyword: '' });
	};

	public onItemEdit = (item?) => {
		this.mv.setVisible(true, item);
	};

	public onItemDelete = (item?) => {
		Modal.confirm({
			title: '提示',
			content: `确认删除 ${item.name} 吗？`,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				this.mv.onDelete({ id: item.id })
			}
		});
	};

	public toggleModal = (modalVisible) => {
		this.mv.setVisible(false);
	};

	public renderPagination = () => {
		const { total, pageSize, current } = this.mv;
		return {
			total,
			pageSize,
			current,
			showSizeChanger: true,
			showTotal: (total: any) => <a>{`总共${total}条`}</a>
		}
	};

	public onTableChange = (pagination) => {
		const { current, pageSize } = pagination;
		this.mv.onChange(current, pageSize);
	};

	public renderTitle = () => {
		const { getFieldDecorator } = this.props.form;
		return <Form layout={'inline'}
								 className={'table-search-form'}>
			<Row type={'flex'}
					 align={'middle'}>
				<Col span={13}>
					<Button icon={'plus'}
									type={'primary'}
									onClick={this.onItemEdit.bind(this, null)}
					>新建</Button>
				</Col>
				<Col span={8}>
					<Item>
						{
							getFieldDecorator('keyword')(
								<Input placeholder={'请输入用户名称或手机号查询'}/>
							)
						}
					</Item>
				</Col>
				<Col span={3}>
					<Button type={'primary'}
									onClick={this.handleSearch}
									style={{ marginRight: 12 }}
					>查询</Button>
					<Button
						onClick={this.handleReset}
					>重置</Button>
				</Col>
			</Row>
		</Form>
	};

	public render() {
		const { list, modalVisible, item } = this.mv;
		return (
			<ContentBox>
				<Table dataSource={list}
							 rowKey={'id'}
							 onChange={this.onTableChange}
							 title={() => this.renderTitle()}
							 pagination={this.renderPagination()}
							 columns={Columns({
								 onEdit: this.onItemEdit,
								 onDelete: this.onItemDelete
							 })}/>
				<Modal visible={modalVisible}
							 title={item ? '编辑用户' : '新建用户'}
							 onCancel={this.toggleModal.bind(this, false)}
							 footer={null}>
					<EditForm onCancel={this.toggleModal.bind(this, false)}
										item={item}/>
				</Modal>
			</ContentBox>
		);
	}
}

export default Form.create({})(EmployeeManage);
