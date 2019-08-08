import { $ProductMV } from "@common/mv/$ProductMV";
import MultiUpload from "@components/image/MultiUpload";
import ModalFooter from "@components/modal/ModalFooter";
import { autowired } from "@core/ioc";
import { toRcFormData } from "@helper/ToRcFormData";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react";
import { FormLayout } from "pekon-wx-common/lib";
import React from "react";

const { Item } = Form;
const { TextArea } = Input;

@observer
class DetailsEditForm extends React.Component<any, any> {

	@autowired($ProductMV)
	public mv: $ProductMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const { item = {} } = this.props;
			this.mv.updateInvoiceProduct({ ...item, ...values }, this.props.refresh)
		});
	};

	public render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		return (
			<Form>
				<Item label={'IMPA'}
							style={{ marginBottom: 0 }}
							{...FormLayout.getFormLayout1(4, 12)}>
					{getFieldValue('impa')}
				</Item>
				<Item label={'Description'}
							style={{ marginBottom: 0 }}
							{...FormLayout.getFormLayout1(4, 12)}>
					{getFieldValue('description')}
				</Item>
				<Item label={'UNIT'}
							style={{ marginBottom: 0 }}
							{...FormLayout.getFormLayout1(4, 12)}>
					{getFieldValue('unit')}
				</Item>
				<Item label={'QTY'}
							style={{ marginBottom: 0 }}
							{...FormLayout.getFormLayout1(4, 12)}>
					{getFieldValue('qty')}
				</Item>
				<Item label={'Unit Price'}
							style={{ marginBottom: 0 }}
							{...FormLayout.getFormLayout1(4, 12)}>
					￥{getFieldValue('unitPrice')}
				</Item>
				<Item label={'Amount'}
							style={{ marginBottom: 0 }}
							{...FormLayout.getFormLayout1(4, 12)}>
					￥{getFieldValue('amount')}
				</Item>
				<Item label={'图片'}
							key={'imagePathShow'}
							{...FormLayout.getFormLayout1(4, 18)}>
					{
						getFieldDecorator('imagePathShow', {})(
							<MultiUpload maxCount={6}/>
						)
					}
				</Item>
				<Item label={'备注说明'}
							{...FormLayout.getFormLayout1(4, 12)}>
					{
						getFieldDecorator('remark')(
							<TextArea placeholder={'有备注信息请填写'}
												autosize={{ minRows: 3, maxRows: 6 }}/>
						)
					}
				</Item>
				<ModalFooter>
					<Button onClick={this.props.onCancel}>取消</Button>
					<Button type="primary" onClick={this.handleSubmit}>确认</Button>
				</ModalFooter>
			</Form>
		);
	}
}

export default Form.create({
	mapPropsToFields: (props: any) => {
		return toRcFormData(props.item || {},{keep:['imagePathShow']})
	}
})(DetailsEditForm);

