import { Method } from "@common/enum/Method";
import { Sex } from "@common/enum/Sex";
import { $EmployeeMV } from "@common/mv/$EmployeeMV";
import SDatePicker from "@components/date/SDatePicker";
import ModalFooter from "@components/modal/ModalFooter";
import { SelectComponent } from "@components/select";
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

	@autowired($EmployeeMV)
	public mv: $EmployeeMV;

	private checkMobileFetch;

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

	public checkMobile = (rule: any, value: any, callback: any) => {
		if (this.checkMobileFetch) {
			clearTimeout(this.checkMobileFetch);
			this.checkMobileFetch = null;
		}
		const { item } = this.props;
		const id = item && item.id || 0;
		this.checkMobileFetch = setTimeout(() => {
			this.mv.checkMobile({ mobile: value, id }, callback);
		}, 200);
	};

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<Item label={'姓名'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('name', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入姓名'}/>
						)
					}
				</Item>
				<Item label={'性别'}
							{...FormLayout.getFormLayout1(5, 16)}>
					{
						getFieldDecorator('sex', { rules: [FormRule.RULE_REQUIRED], initialValue: Sex.MALE })(
							<Group>
								<Radio value={Sex.MALE}>男</Radio>
								<Radio value={Sex.FEMALE}>女</Radio>
							</Group>
						)
					}
				</Item>
				<Item label={'生日'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('birthday', { rules: [] })(
							<SDatePicker/>
						)
					}
				</Item>
				<Item label={"手机号码"}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('mobile', {
							rules: [FormRule.RULE_REQUIRED_MSG('请输入手机号码'), FormRule.RULE_PHONE, { validator: this.checkMobile }],
							validateFirst: true
						})(
							<Input placeholder={'请输入手机号码'}
										 maxLength={11}/>
						)
					}
				</Item>
				<Item label={"角色"}
							key={'roleId'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('roleId', {
							rules: [FormRule.RULE_REQUIRED_MSG('请选择角色')]
						})(
							<SelectComponent requestMethod={Method.GET}
															 requestUrl={'/role/query'}
															 labelKey={'name'}
															 valueKey={'id'}
							/>
						)
					}
				</Item>
				<Item label={"公司名称"}
							key={'company'}
							{...FormLayout.getFormLayout1(5, 12)}>
					{
						getFieldDecorator('company', {
							rules: [FormRule.RULE_REQUIRED_MSG('请输入所属公司名称')]
						})(
							<Input placeholder={'请输入所属公司名称'}/>
						)
					}
				</Item>
				<Item label={'是否授权登录'}
							{...FormLayout.getFormLayout1(5, 16)}>
					{
						getFieldDecorator('isAuth', { rules: [FormRule.RULE_REQUIRED], initialValue: 0 })(
							<Group>
								<Radio value={0}>允许</Radio>
								<Radio value={1}>不允许</Radio>
							</Group>
						)
					}
				</Item>
				<Item label={'状态'}
							{...FormLayout.getFormLayout1(5, 16)}>
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
