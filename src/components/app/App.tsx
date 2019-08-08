import { $AccountInfoMV } from "@common/mv/$AccountInfoMV";
import { $SpinMV } from "@common/mv/$SpinMV";
import BasicLayout from "@components/layouts/BasicLayout";
import { autowired } from "@core/ioc";
import { Spin } from "antd";
import { observer } from "mobx-react";
import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

@observer
class App extends React.Component<any, any> {

	@autowired($SpinMV)
	public $spinMV: $SpinMV;

	@autowired($AccountInfoMV)
	public $accountInfoMV: $AccountInfoMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public componentDidMount() {
		this.$accountInfoMV.queryAccountInfo(this.props);
	}

	public render() {
		const { $spin } = this.$spinMV;
		return (
			<SPage>
				<Spin spinning={$spin.spinning}
							tip={$spin.tip}
							size={$spin.size}
							delay={$spin.delay}>
					<BasicLayout>
						{this.props.children}
					</BasicLayout>
				</Spin>
			</SPage>
		);
	}
}

export default withRouter(App);

const SPage = styled.div`// styled
  & {
    > .ant-spin-nested-loading {
      > .ant-spin-container {
        width: 100%;
        height: 100vh;
        overflow: auto;
      }
    }
  }
`;
