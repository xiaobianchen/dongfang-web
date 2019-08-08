import { $InvoiceMV } from "@common/mv/$InvoiceMV";
import { $ProductMV } from "@common/mv/$ProductMV";
import { autowired } from "@core/ioc";
import { goToPath } from "@helper/Helper";
import { Paths, RoutePaths } from "@routers/const";
import Columns from "@views/basic/invoice/DetailsColumns";
import DetailsEditForm from "@views/basic/invoice/DetailsEditForm";
import { Button, Modal, Table } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

@observer
class DetailsList extends React.Component<any, any> {

	@autowired($ProductMV)
	public mv: $ProductMV;

	@autowired($InvoiceMV)
	public $invoiceMV: $InvoiceMV;

	constructor(props) {
		super(props);
		this.state = {
			item: null
		};
	}

	public componentDidMount() {
		this.loadData();
	}

	public loadData = () => {
		const { id } = this.props.location.query;
		this.mv.queryInvoiceProducts({ id })
	};

	public toggleModal = (modalVisible) => {
		this.mv.setFormVisible(modalVisible);
	};

	public showForm = (item) => {
		this.setState({ item }, () => this.mv.setFormVisible(true))
	};

	public onOver = (item, index) => {
		this.mv.updateInvoiceProductStatus({ id: item.id, status: 1 }, index, this.loadData)
	};

	public renderPagination = () => {
		const { data, pageSize, current } = this.mv;
		return {
			total: data.length,
			pageSize,
			current,
			showSizeChanger: false,
			showTotal: (total: any) => <a>{`总共${total}条`}</a>
		}
	};

	public onTableChange = (pagination) => {
		const { current, pageSize } = pagination;
		this.mv.onChange(current, pageSize);
	};

	public goBack = () => {
		goToPath(this.props, RoutePaths[Paths.INVOICE_MANAGE], {}, true);
		const { list, setDetailsVisible } = this.$invoiceMV;
		this.$invoiceMV.onSearch({ keyword: '' });
		setDetailsVisible(false);
	};

	public onExport = () => {
		const { id } = this.props.location.query;
		window.open(`/excel/exportExcel?type=3&sendOrderId=${id}`)
	};


	public render() {
		const { data, current, pageSize, formVisible } = this.mv;
		const start = (current - 1) * pageSize;
		const { item } = this.state;
		const title = <div>
			<Button type={'primary'}
							icon={'rollback'}
							style={{ marginRight: 16 }}
							onClick={this.goBack}
			>返回列表</Button>
			<Button icon={'upload'}
							type={'primary'}
							onClick={this.onExport}
			>导出Excel</Button></div>
		return (
			<SDiv>
				<Table dataSource={data}
							 rowKey={'id'}
							 title={() => title}
							 scroll={{ x: true }}
							 onChange={this.onTableChange}
							 pagination={this.renderPagination()}
							 columns={Columns({
								 onEdit: this.showForm,
								 onOver: this.onOver,
								 start
							 })}/>
				<Modal visible={formVisible}
							 footer={null}
							 maskClosable={false}
							 onCancel={this.toggleModal.bind(this, false)}
							 title={'配货详情'}>
					<DetailsEditForm item={item}
													 refresh={this.loadData}
													 onCancel={() => this.mv.setFormVisible(false)}/>
				</Modal>
			</SDiv>
		);
	}
}

export default withRouter(DetailsList);

const SDiv = styled.div`// styled
  & {
    .ant-table td {
      white-space: nowrap;
    }
  }
`;
