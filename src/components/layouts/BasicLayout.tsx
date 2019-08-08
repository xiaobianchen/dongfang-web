import { $AccountInfoMV } from "@common/mv/$AccountInfoMV";
import { $HeaderMenuMV } from "@common/mv/$HeaderMenuMV";
import HeaderMenu from "@components/menu/HeaderMenu";
import { autowired } from "@core/ioc";
import { Paths, RoutePaths } from "@routers/const";
import { Breadcrumb, Layout } from 'antd';
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";

const { Content } = Layout;

@observer
class BasicLayout extends React.Component<any, any> {

	@autowired($HeaderMenuMV)
	public $headerMenuMV: $HeaderMenuMV;

	@autowired($AccountInfoMV)
	public $accountInfoMV: $AccountInfoMV;

	constructor(props) {
		super(props);
		this.state = {};
	}

	public render() {
		const { pageTitle, pageParentTitle } = this.$headerMenuMV;
		const { isAdmin } = this.$accountInfoMV;
		return (
			<Layout>
				<HeaderMenu/>
				<Content style={{ marginTop: 64 }}>
					<div style={{ minHeight: 'calc(100vh - 186px)' }}>
						{pageParentTitle && <ContentTitle>
                <Breadcrumb style={{ marginBottom: 16 }}>
                    <Breadcrumb.Item
                        href={isAdmin ? RoutePaths[Paths.ROLE_MANAGE] : RoutePaths[Paths.INVOICE_MANAGE]}>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>{pageParentTitle}</Breadcrumb.Item>
                </Breadcrumb>
                <h1>{pageTitle}</h1>
            </ContentTitle>}
						{this.props.children}
					</div>
				</Content>
				{/*<FooterView/>*/}
			</Layout>
		);
	}
}

export default BasicLayout;

const ContentTitle = styled.div`// styled
  & {
    position: relative;
    padding: 16px 32px 0 32px;
    background: white;
    > h1 {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      padding-bottom: 16px;
    }
  }
`;
