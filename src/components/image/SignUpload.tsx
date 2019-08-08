import { SPreview } from "@components/image/MultiUpload";
import MessageHelper from "@helper/MessageHelper";
import { Icon, Modal, Upload } from "antd";
import React from "react";
import styled from "styled-components";

const maxCount = 1;

class SignUpload extends React.Component<any, any> {

	constructor(props: any) {
		super(props);
		this.state = {
			value: props.value,
			previewVisible: false,
			previewImage: '',
			fileList: [],
		};
	}

	public componentDidMount() {
		this.setFileList();
	}

	public setFileList = () => {
		const { value } = this.state;
		if (value) {
			this.setState({
				fileList: [
					{
						uid: -1,
						name: '个人简介',
						status: 'done',
						url: value
					}
				]
			})
		} else {
			this.setState({
				fileList: []
			})
		}
	};

	public componentWillReceiveProps(nextProps: any) {
		if (nextProps.value !== this.state.value) {
			this.setState({ value: nextProps.value }, () => this.setFileList())
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
			const { url } = file.response;
			this.setState({ value: url });
			url && this.props.onChange && this.props.onChange(url);
		} else if (file.status === 'error') {
			MessageHelper.error(`${file.name} 文件上传失败.`);
		} else if (file.status = 'removed') {
			fileList.length === 0 && this.props.onChange && this.props.onChange(undefined);
		}
		this.setState({ fileList })
	};

	public render() {
		const { previewVisible, previewImage, fileList } = this.state;
		const { disabled } = this.props;
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
					{fileList.length >= maxCount ? null : uploadButton}
				</Upload>
				<Modal visible={previewVisible}
							 footer={null}
							 onCancel={this.handleCancel}>
					<SPreview>
						<img src={previewImage}/>
					</SPreview>
				</Modal>
			</SDiv>
		);
	}
}

export default SignUpload;

const SDiv = styled.div`// styled
  & {
    .anticon-delete {
      display: ${(props: any) => props.theme.disabled ? 'none' : 'inline-block'};
    }
  }
`;