import { $AccountInfoMV } from "@common/mv/$AccountInfoMV";
import { $HeaderMenuMV } from "@common/mv/$HeaderMenuMV";
import { $AccountService } from "@common/services/$AccountService";
import ModifyPassword from "@components/menu/ModifyPassword";
import { resultHelper } from "@core/http/helper";
import { autowired } from "@core/ioc";
import { getAssetPath } from "@helper/Helper";
import { Avatar, Dropdown, Icon, Layout, Menu, Modal } from "antd";
import { observer } from "mobx-react";
import { CookieUtils } from "pekon-wx-common/lib";
import React from "react";
import { withRouter } from "react-router";
import styled from "styled-components";

const { SubMenu, Item, Divider } = Menu;
const { Header } = Layout;


@observer
class HeaderMenu extends React.Component<any, any> {

	@autowired($HeaderMenuMV)
	public $headerMenuMV: $HeaderMenuMV;

	@autowired($AccountInfoMV)
	public $accountInfoMV: $AccountInfoMV;

	@autowired($AccountService)
	public $accountService: $AccountService;

	private editForm;

	constructor(props) {
		super(props);
		this.state = {
			visible: false
		}
	}

	public componentDidMount() {
		const { pathname } = this.props.location;
		const { init } = this.$headerMenuMV;
		init(pathname);
	}

	public onMenuItemClick = (e) => {
		const { onMenuItemClick } = this.$headerMenuMV;
		onMenuItemClick(e.key, this.props);
	};

	public onDropMenuItemClick = (e) => {
		const key = e.key;
		if (key === '1') {
			this.showConfirm();
		} else if (key === '0') {
			this.setState({ visible: true })
		}
	};

	public showConfirm = () => {
		Modal.confirm({
			title: '提示',
			content: '确认退出系统吗？',
			okText: '确认',
			cancelText: '取消',
			onOk: () => {
				CookieUtils.removeCookie('autoLogin');
				this.$accountService.accountLogout()
			}
		});
	};

	public onModifyPassword = () => {
		this.editForm.validateFieldsAndScroll((error: any, values: any) => {
			if (error) {
				return;
			}
			this.setState({ visible: false });
			this.$accountService.modifyPassword(values)
				.then(res => resultHelper(res, true))
				.then(data => {
					CookieUtils.removeCookie('userInfo');
					CookieUtils.removeCookie('autoLogin');
					this.$accountService.accountLogout()
				});
		})
	};

	public render() {
		const { $selectMenuKey, $menuItems, showMenu } = this.$headerMenuMV;
		const { $accountInfo } = this.$accountInfoMV;
		const { visible } = this.state;
		const menu = (
			<Menu onClick={this.onDropMenuItemClick}>
				<Item key="0">
					修改密码
				</Item>
				<Divider/>
				<Item key="1">
					退出系统
				</Item>
			</Menu>
		);

		return (
			<SHeader>
				<SLogo>
					<img alt="logo" src={getAssetPath('logo.svg')}/>
					泗赫云管理平台
				</SLogo>
				<Menu
					selectedKeys={$selectMenuKey && [$selectMenuKey]}
					onClick={this.onMenuItemClick}
					mode="horizontal"
					style={{ flex: 1 }}
					theme={"dark"}
				>
					{
						showMenu && $menuItems.map(item => <SubMenu key={item.key}
																												title={<span className="submenu-title-wrapper"><Icon
																													type={item.icon}/>{item.name}</span>}>
							{
								item.children.map(cItem => <Item key={cItem.key}>
								<span className="submenu-title-wrapper"><Icon
									type={cItem.icon}/>{cItem.name}</span>
								</Item>)
							}
						</SubMenu>)
					}
				</Menu>
				<Dropdown overlay={menu}>
					<SAccount>
						<Avatar src={getAssetPath('user.png')}
										style={{ marginRight: 8 }}
										size={'small'}/>
						{$accountInfo && $accountInfo.userName}
						<Icon type={'down'}/>
					</SAccount>
				</Dropdown>
				<Modal key={Math.random()}
							 maskClosable={false}
							 onCancel={() => this.setState({ visible: false })}
							 onOk={this.onModifyPassword.bind(this)}
							 visible={visible}
							 title={'密码修改'}>
					<ModifyPassword ref={ref => this.editForm = ref}/>
				</Modal>
			</SHeader>
		);
	}
}

export default withRouter(HeaderMenu);

const SHeader = styled(Header)`// styled
  & {
    position: fixed;
    z-index: 100;
    width: 100%;
    display: flex;
    align-items: center;
  }
`;

const SLogo = styled.div`// styled
  & {
    font-size: 16px;
    font-weight: 400;
    color: white;
    margin-right: 12px;
    > img {
      height: 32px;
      margin-right: 12px;
    }
  }
`;

const SAccount = styled.div`// styled
  & {
    color: white;
    cursor: pointer;
    > i {
      margin-left: 8px;
    }
  }
`;

