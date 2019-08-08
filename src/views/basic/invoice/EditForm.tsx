import { Method } from "@common/enum/Method";
import { $InvoiceMV } from "@common/mv/$InvoiceMV";
import ModalFooter from "@components/modal/ModalFooter";
import { SelectComponent } from "@components/select";
import { autowired } from "@core/ioc";
import MessageHelper from "@helper/MessageHelper";
import { toRcFormData } from "@helper/ToRcFormData";
import { Button, Form, Input, Upload } from "antd";
import { observer } from "mobx-react";
import { FormLayout, FormRule } from "pekon-wx-common/lib";
import React from "react";

const { Item } = Form;

@observer
class EditForm extends React.Component<any, any> {

	@autowired($InvoiceMV)
	public mv: $InvoiceMV;

	constructor(props) {
		super(props);
		this.state = {
			fileList: []
		};
	}

	public handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			const { fileList } = this.state;
			const formData = new FormData();
			fileList.forEach((file) => {
				formData.append('file', file);
			});
			delete values.file;
			this.mv.onSave(values, formData);
		});
	};

	public render() {
		const { getFieldDecorator, setFieldsValue } = this.props.form;
		const { fileList } = this.state;
		const props = {
			name: 'file',
			accept: '.xlsx',
			fileList,
			action: `/excel/importExcel?type=1`,
			beforeUpload: (file) => {
				this.setState({ fileList: [file] });
				setFieldsValue({ file: [file] });
				return false;
			},
			onRemove: (file) => {
				this.setState({ fileList: [] });
				setFieldsValue({ file: undefined })
			},
			onChange(info) {
				const status = info.file.status;
				if (status === 'done') {
					MessageHelper.success(`${info.file.name} 上传成功。`);
				} else if (status === 'error') {
					MessageHelper.error(`${info.file.name} 上传失败。${info.file.response.msg}`);
				}
			}
		};
		return (
			<Form>
				<Item label={'订单号'}
							{...FormLayout.getFormLayout1(4, 12)}>
					{
						getFieldDecorator('orderNumber', { rules: [FormRule.RULE_REQUIRED] })(
							<Input placeholder={'请输入'}/>
						)
					}
				</Item>
				<Item label={'收货人'}
							{...FormLayout.getFormLayout1(4, 12)}>
					{
						getFieldDecorator('receiverId', { rules: [FormRule.RULE_REQUIRED] })(
							<SelectComponent requestMethod={Method.GET}
															 requestUrl={'/user/query'}
															 labelKey={'name'}
															 valueKey={'id'}
							/>
						)
					}
				</Item>
				<Item label={'订货单'}
							{...FormLayout.getFormLayout1(4, 16)}>
					{
						getFieldDecorator('file', { rules: [FormRule.RULE_REQUIRED] })(
							<Upload {...props}>
								<Button icon={'upload'}
												type={'primary'}
												size={'small'}>点击上传</Button>
							</Upload>
						)
					}
					<a onClick={()=>window.open(`/excel/exportExcel?type=2`)}>点击下载模板</a>
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
