import MessageHelper from "@helper/MessageHelper";
import { Icon, Modal, Upload } from "antd";
import React from "react";
import styled from "styled-components";

export interface MultiUploadProps {
	maxCount?: number;
	disabled?: boolean;
	onChange?: any;
	value?: any;
}

class MultiUpload extends React.Component<MultiUploadProps, any> {

	public static defaultProps = {
		maxCount: 5,
		disabled: false
	};

	constructor(props: any) {
		super(props);
		this.state = {
			value: props.value || [],
			previewVisible: false,
			previewImage: '',
			fileList: [],
		};
	}

	public componentDidMount() {
		this.setFileList();
	}

	public setFileList = () => {
		const { value = [] } = this.state;
		const fileList = value.map((item: any, index: number) => {
			return {
				uid: -index,
				name: 'img',
				status: 'done',
				url: item
			}
		});
		this.setState({ fileList })
	};

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value || [] }, () => this.setFileList())
		}
	}

	public handleCancel = () => this.setState({ previewVisible: false })

	public handlePreview = (file: any) => {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		});
	};

	public handleChange = ({ file, fileList }: any) => {
		if (file.status === 'done') {
			const { code, msg, data } = file.response;
			if (code === 200) {
				MessageHelper.success(msg);
				const { value = [] } = this.state;
				value.push(data.url);
				data.url && this.props.onChange && this.props.onChange(value);
			} else {
				MessageHelper.error(msg);
				const { value = [] } = this.state;
				this.props.onChange && this.props.onChange(value);
			}
		} else if (file.status === 'error') {
			MessageHelper.error(`${file.name} 文件上传失败.`);
		} else if (file.status = 'removed') {
			const { value = [] } = this.state;
			const { url } = file;
			const index = value.indexOf(url);
			if (index !== -1) {
				value.splice(index, 1);
				this.props.onChange && this.props.onChange(value.length === 0 ? undefined : value);
			}
		}
		this.setState({ fileList })
	};

	public render() {
		const { previewVisible, previewImage, fileList } = this.state;
		const { disabled, maxCount } = this.props;
		const uploadButton = (
			<div>
				<Icon type="plus"/>
				<div className="ant-upload-text">上传</div>
			</div>
		);
		return (
			<SDiv className="clearfix" theme={{ disabled }}>
				<Upload
					action="/image/upload"
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
				>
					{(fileList.length >= (maxCount || 0) || disabled) ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<SPreview>
						<img src={previewImage}/>
					</SPreview>
				</Modal>
			</SDiv>
		);
	}
}

const SDiv = styled.div`// styled
  & {
    .anticon-delete {
      display: ${(props: any) => props.theme.disabled ? 'none' : 'inline-block'};
    }
  }
`;

export const SPreview = styled.div`// styled
  & {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    > img {
      max-height: 100%;
      max-width: 100%;
    }
  }
`;

export default MultiUpload;
