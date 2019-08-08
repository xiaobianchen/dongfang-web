import { $BasicDataMV } from "@common/mv/$BasicDataMV";
import { autowired } from "@core/ioc";
import MessageHelper from "@helper/MessageHelper";
import { Button, Modal, Timeline, Upload } from "antd";
import { observer } from "mobx-react";
import React from "react";

@observer
class ImportModal extends React.Component<any, any> {

	@autowired($BasicDataMV)
	public mv: $BasicDataMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public render() {
		const { importVisible, setImportVisible,onQuery } = this.mv;
		const props = {
			name: 'file',
			accept: '.xlsx',
			action: `/excel/importExcel?type=1`,
			onChange(info) {
				const status = info.file.status;
				if (status === 'done') {
					MessageHelper.success(`${info.file.name} 上传成功。`);
					setImportVisible(false);
					onQuery();
				} else if (status === 'error') {
					MessageHelper.error(`${info.file.name} 上传失败。${info.file.response.msg}`);
				}
			}
		};
		return (
			<Modal visible={importVisible}
						 footer={null}
						 onCancel={() => setImportVisible(false)}
						 title={'批量导入基础数据'}
			>
				<Timeline>
					<Timeline.Item dot={1}>
						<h3>下载模板</h3>
						<a onClick={()=>window.open(`/excel/exportExcel?type=1`)}>点击下载</a>
					</Timeline.Item>
					<Timeline.Item dot={2}>
						<h3>填写模板</h3>
						<div>按照Excel格式填写模板</div>
					</Timeline.Item>
					<Timeline.Item dot={3}>
						<h3>上传文件</h3>
						<Upload {...props} key={Math.random()}>
							<Button icon={'upload'}
											type={'primary'}
											size={'small'}>点击上传</Button>
						</Upload>
					</Timeline.Item>
				</Timeline>
			</Modal>
		);
	}
}

export default ImportModal;
