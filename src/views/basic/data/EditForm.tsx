import { $BasicDataMV } from "@common/mv/$BasicDataMV";
import ModalFooter from "@components/modal/ModalFooter";
import { autowired } from "@core/ioc";
import { toRcFormData } from "@helper/ToRcFormData";
import { Button, Form, Input } from "antd";
import { observer } from "mobx-react";
import { FormLayout, FormRule } from "pekon-wx-common/lib";
import React from "react";

const { Item } = Form;

@observer
class EditForm extends React.Component<any, any> {

	@autowired($BasicDataMV)
	public mv: $BasicDataMV;

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
			const { item } = this.props;
			values.id = item && item.id || 0;
			this.mv.onSave(values);
		});
	};

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<Item label={'STKCODE'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('stkCode', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入'}/>
						)
					}
				</Item>
				<Item label={'STKNAME'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('stkName', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入'}/>
						)
					}
				</Item>
				<Item label={'STKMODEL'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('stkModel', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入'}/>
						)
					}
				</Item>
				<Item label={'STKUOM'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('stkUom', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入'}/>
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
})(EditForm);
