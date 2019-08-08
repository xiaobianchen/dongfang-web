import { $InvoiceMV } from "@common/mv/$InvoiceMV";
import ContentBox from "@components/content/ContentBox";
import { autowired } from "@core/ioc";
import { goToPath } from "@helper/Helper";
import { Paths, RoutePaths } from "@routers/const";
import AddressModal from "@views/basic/data/AddressModal";
import Columns from "@views/basic/invoice/Columns";
import DetailsList from "@views/basic/invoice/DetailsList";
import EditForm from "@views/basic/invoice/EditForm";
import EditRemarkForm from "@views/basic/invoice/EditRemarkForm";
import { Button, Col, Form, Input, Modal, Row, Table } from "antd";
import { observer } from "mobx-react";
import React from "react";

const { Item } = Form;

@observer
class InvoiceList extends React.Component<any, any> {

	@autowired($InvoiceMV)
	public mv: $InvoiceMV;

	constructor(props) {
		super(props);
		this.state = {
			addressVisible: false,
			selectItem: null,
		};
	}

	public componentDidMount() {
		const { id } = this.props.location.query;
		this.mv.init();
		!!id && this.toggleDetailsModal(true);
		if (!id) {
			this.toggleDetailsModal(false);
			this.mv.onSearch({ keyword: '' });
		}

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

	public onItemRemark = (item?) => {
		this.mv.setRemarkVisible(true, item);
	};

	public onItemDelete = (item?) => {
		Modal.confirm({
			title: '提示',
			content: `确认删除这条数据吗？`,
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

	public toggleRemarkModal = (modalVisible) => {
		this.mv.setRemarkVisible(modalVisible);
	};

	public showDetailsModal = (item) => {
		goToPath(this.props, RoutePaths[Paths.INVOICE_MANAGE], { id: item.id }, true);
		this.mv.setDetailsVisible(true);
	};
	public onExpress = (item) => {
		this.setState({ selectItem: item, addressVisible: true });
	}

	public toggleDetailsModal = (detailsVisible) => {
		this.mv.setDetailsVisible(detailsVisible);
	};

	public renderPagination = () => {
		const { count, pageSize, current } = this.mv;
		return {
			total: count,
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
		const { formData } = this.mv;
		const { getFieldDecorator } = this.props.form;
		return <Form layout={'inline'}
								 className={'table-search-form'}>
			<Row type={'flex'}
					 align={'middle'}>
				<Col span={13}>
					<Button icon={'plus'}
									type={'primary'}
									style={{ marginRight: 12 }}
									onClick={this.onItemEdit.bind(this, null)}
					>新建发货单</Button>

				</Col>
				<Col span={8}>
					<Item>
						{
							getFieldDecorator('keyword', {
								initialValue: formData && formData.keyword
							})(
								<Input placeholder={'请输入订单号、收货人、收货人公司名称查询'}
								/>
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
	public onModal = (bool) => {
		if (bool) {
			this.setState({ addressVisible: false }, () => {
				this.props.form.setFieldsValue({ keyword: '' });
				this.mv.onSearch({ keyword: '' });
			})
		} else {
			this.setState({ addressVisible: false })
		}
	}

	public render() {
		const { list, modalVisible, item, detailsVisible, remarkVisible } = this.mv;
		const { id } = this.props.location.query;
		const { selectItem, addressVisible } = this.state;
		return (
			<ContentBox>
				{
					detailsVisible && <DetailsList id={id}/>
				}
				{
					!detailsVisible && <Table dataSource={list}
                                    rowKey={'id'}
                                    scroll={{ x: true }}
                                    onChange={this.onTableChange}
                                    title={() => this.renderTitle()}
                                    pagination={this.renderPagination()}
                                    columns={Columns({
																			onEdit: this.showDetailsModal.bind(this),
																			onDelete: this.onItemDelete,
																			onRemark: this.onItemRemark,
																			onExpress: this.onExpress,
																		})}/>
				}

				<Modal visible={modalVisible}
							 title={item ? '编辑发货单' : '新建发货单'}
							 onCancel={this.toggleModal.bind(this, false)}
							 footer={null}>
					<EditForm onCancel={this.toggleModal.bind(this, false)}
										item={item}/>
				</Modal>
				<Modal visible={addressVisible}
							 title={'设置快递信息'}
							 key={Math.random()}
							 footer={null}
							 onCancel={this.onModal}>
										<AddressModal onCancel={this.onModal} item={selectItem} />
				</Modal>

				<Modal visible={remarkVisible}
							 title={'备注'}
							 onCancel={this.toggleRemarkModal.bind(this, false)}
							 footer={null}>
					<EditRemarkForm onCancel={this.toggleRemarkModal.bind(this, false)}
													item={item}/>
				</Modal>
			</ContentBox>
		);
	}
}

export default Form.create({})(InvoiceList);