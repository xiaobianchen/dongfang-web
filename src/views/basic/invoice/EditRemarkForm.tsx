import { $InvoiceMV } from "@common/mv/$InvoiceMV";
import ModalFooter from "@components/modal/ModalFooter";
import { autowired } from "@core/ioc";
import { toRcFormData } from "@helper/ToRcFormData";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react";
import { FormLayout, FormRule } from "pekon-wx-common/lib";
import React from "react";

const { Item } = Form;

@observer
class EditRemarkForm extends React.Component<any, any> {

	@autowired($InvoiceMV)
	public mv: $InvoiceMV;

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
			const { item } = this.mv;
			this.mv.onRemark({ id: item.id, ...values })
		});

	};

	public render() {
		const { getFieldDecorator, setFieldsValue } = this.props.form;

		return (
			<Form>
				<Item label={'订单号'}
							{...FormLayout.getFormLayout1(4, 12)}>
					{
						getFieldDecorator('orderNumber', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入'}
										 disabled={true}/>
						)
					}
				</Item>
				<Item label={'备注'}
							{...FormLayout.getFormLayout1(4, 16)}>
					{
						getFieldDecorator('remark', { rules: [FormRule.RULE_REQUIRED, FormRule.RULE_MAX(200)] })(
							<Input.TextArea placeholder={'请输入'}
															style={{ minHeight: 100 }}/>
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
		return toRcFormData(props.item || {})
	}
})(EditRemarkForm);
