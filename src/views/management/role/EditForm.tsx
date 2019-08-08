import { $RoleMV } from "@common/mv/$RoleMV";
import ModalFooter from "@components/modal/ModalFooter";
import { autowired } from "@core/ioc";
import { toRcFormData } from "@helper/ToRcFormData";
import { Button, Form, Input, Radio } from "antd";
import { observer } from "mobx-react";
import { FormLayout, FormRule } from "pekon-wx-common/lib";
import React from "react";

const { Item } = Form;
const { Group } = Radio;
const { TextArea } = Input;

@observer
class EditForm extends React.Component<any, any> {

	@autowired($RoleMV)
	public $roleMV: $RoleMV;

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
			this.$roleMV.onSave(values);
		});
	};

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<Item label={'角色名称'}
							{...FormLayout.getFormLayout1(4, 12)}>
					{
						getFieldDecorator('name', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入'}/>
						)
					}
				</Item>
				<Item label={'角色描述'}
							{...FormLayout.getFormLayout1(4, 12)}>
					{
						getFieldDecorator('memo', { rules: [FormRule.RULE_REQUIRED] })(
							<TextArea placeholder={'请输入'}
												autosize={{ minRows: 3, maxRows: 6 }}/>
						)
					}
				</Item>
				<Item label={'角色类型'}
							{...FormLayout.getFormLayout1(4, 16)}>
					{
						getFieldDecorator('type', { rules: [FormRule.RULE_REQUIRED], initialValue: 1 })(
							<Group>
								<Radio value={3}>客户</Radio>
								<Radio value={2}>普通员工</Radio>
								<Radio value={1}>管理</Radio>
							</Group>
						)
					}
				</Item>
				<Item label={'角色状态'}
							{...FormLayout.getFormLayout1(4, 16)}>
					{
						getFieldDecorator('status', { rules: [FormRule.RULE_REQUIRED], initialValue: 1 })(
							<Group>
								<Radio value={1}>启用</Radio>
								<Radio value={0}>关闭</Radio>
							</Group>
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
