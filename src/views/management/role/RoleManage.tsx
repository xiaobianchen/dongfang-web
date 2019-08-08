import { $RoleMV } from "@common/mv/$RoleMV";
import ContentBox from "@components/content/ContentBox";
import { autowired } from "@core/ioc";
import Columns from "@views/management/role/Columns";
import EditForm from "@views/management/role/EditForm";
import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { observer } from "mobx-react";
import React from "react";

const { Item } = Form;

@observer
class RoleManage extends React.Component<any, any> {

	@autowired($RoleMV)
	public $roleMV: $RoleMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		this.$roleMV.init();
		this.$roleMV.onSearch({keyword:''});
	}

	public handleSearch = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			this.$roleMV.onSearch(values);
		});
	};

	public handleReset = () => {
		this.props.form.resetFields();
		this.$roleMV.onSearch({ keyword: '' });
	};

	public onItemEdit = (item?) => {
		this.$roleMV.setVisible(true, item);
	};

	public onItemDelete = (item?) => {
		Modal.confirm({
			title: '提示',
			content: `确认删除 ${item.name} 吗？`,
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				this.$roleMV.onDelete({ id: item.id })
			}
		});
	};

	public toggleModal = (modalVisible) => {
		this.$roleMV.setVisible(false);
	};

	public renderPagination = () => {
		const { total, pageSize, current } = this.$roleMV;
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
		this.$roleMV.onChange(current, pageSize);
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
					<Item label={'角色名称'}>
						{
							getFieldDecorator('keyword')(
								<Input placeholder={'请输入'}/>
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
		const { roleList, modalVisible, item } = this.$roleMV;
		return (
			<ContentBox>
				<Table dataSource={roleList}
							 rowKey={'id'}
							 onChange={this.onTableChange}
							 title={() => this.renderTitle()}
							 pagination={this.renderPagination()}
							 columns={Columns({
								 onEdit: this.onItemEdit,
								 onDelete: this.onItemDelete
							 })}/>
				<Modal visible={modalVisible}
							 title={item ? '编辑角色' : '新建角色'}
							 onCancel={this.toggleModal.bind(this, false)}
							 footer={null}>
					<EditForm onCancel={this.toggleModal.bind(this, false)}
										item={item}/>
				</Modal>
			</ContentBox>
		);
	}
}

export default Form.create({})(RoleManage);


