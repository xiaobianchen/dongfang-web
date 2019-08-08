import { Method } from "@common/enum/Method";
import { $BasicService } from "@common/services/$BasicService";
import ModalFooter from "@components/modal/ModalFooter";
import { SelectComponent } from "@components/select";
import AjaxUtils from "@core/http";
import { resultHelper } from "@core/http/helper";
import { autowired } from "@core/ioc";
import { toRcFormData } from "@helper/ToRcFormData";
import { Button, Form, Input, Upload } from "antd";
import { observe } from "mobx";
import { FormLayout, FormRule } from "pekon-wx-common/lib";
import React from "react";

const { Item } = Form;

class AddressModal extends React.Component<any, any> {

	@autowired($BasicService)
	public $basicService: $BasicService;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public save = (e) => {
		e.preventDefault();
		const { item } = this.props;
		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			AjaxUtils.post('/sendOrder/updateExpress', { orderNumber: item.orderNumber, ...values })
				.then(resultHelper)
				.then(data => {
					console.log(data, 'datadata');
					this.props.onCancel(true);
				})
		});
	}

	public render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Form>
				<Item label={'快递公司名称'}
							{...FormLayout.getFormLayout1(6, 12)}>
					{
						getFieldDecorator('expressName', { rules: [] })(
							<Input placeholder={'请输入'}/>
						)
					}
				</Item>
				<Item label={'快递单号'}
							{...FormLayout.getFormLayout1(6, 12)}>
					{
						getFieldDecorator('expressId', { rules: [] })(
							<Input placeholder={'请输入'}/>
						)
					}
				</Item>
				<ModalFooter>
					<Button onClick={() => this.props.onCancel(false)}>取消</Button>
					<Button type="primary" onClick={this.save}>确认</Button>
				</ModalFooter>
			</Form>
		);
	}
}

export default Form.create({
	mapPropsToFields: (props: any) => {
		return toRcFormData(props.item || {})
	}
})(AddressModal);
