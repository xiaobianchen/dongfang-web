import { Form, Input } from "antd";
import { FormLayout, FormRule } from "pekon-wx-common/lib";
import React from "react";

const { Item } = Form;
const Layout = FormLayout.getFormLayout1(4, 16);

class ModifyPassword extends React.Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {};
	}

	public checkNewPassword = (rule: any, value: any, callback: any) => {
		const { form } = this.props;
		const v = form.getFieldValue;
		const password = v('password');
		const confirmPassword = v('confirmPassword');
		if (confirmPassword && confirmPassword !== value) {
			form.setFields({
				confirmPassword: {
					value: confirmPassword,
					errors: [new Error('两次输入密码不一致')],
				},
			});
		}
		if (value && password === value) {
			callback('新密码不能与原密码相同');
			return;
		}
		callback();
	};

	public checkConfirmPassword = (rule: any, value: any, callback: any) => {
		const { form } = this.props;
		const v = form.getFieldValue;
		const newPassword = v('newPassword');
		if (value && newPassword !== value) {
			callback('两次输入密码不一致');
			return;
		}
		callback();
	};

	public render() {
		const { form } = this.props;
		const f = form.getFieldDecorator;
		return (
			<Form>
				<Item label={"原密码"}
							key={"password"}
							{...Layout}>
					{
						f('password', {
							rules: [FormRule.RULE_REQUIRED_MSG('请输入原密码')]
						})(
							<Input type={"password"}/>
						)
					}
				</Item>
				<Item label={"新密码"}
							key={'newPassword'}
							{...Layout}>
					{
						f('newPassword', {
							rules: [FormRule.RULE_REQUIRED_MSG('请输入新密码'), { validator: this.checkNewPassword }]
						})(
							<Input type={"password"}/>
						)
					}
				</Item>
				<Item label={"确认密码"}
							key={'confirmPassword'}
							{...Layout}>
					{
						f('confirmPassword', {
							rules: [FormRule.RULE_REQUIRED_MSG('请输入确认密码'), { validator: this.checkConfirmPassword }]
						})(
							<Input type={"password"}/>
						)
					}
				</Item>
			</Form>
		);
	}
}

export default Form.create({})(ModifyPassword);
