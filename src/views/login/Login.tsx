import { $AccountService } from "@common/services/$AccountService";
import { resultHelper } from "@core/http/helper";
import { autowired } from "@core/ioc";
import { getAssetPath, goToPath } from "@helper/Helper";
import { Paths, RoutePaths } from "@routers/const";
import { Button, Form, Icon, Input } from 'antd';
import { observer } from "mobx-react";
import { FormRule } from "pekon-wx-common/lib";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import './index.less';

const { Item } = Form;

@observer
class $Login extends React.Component<any, any> {

	@autowired($AccountService)
	public $accountService: $AccountService;

	constructor(props) {
		super(props);
		this.state = {
			autoLogin: false,
			type: 'text',
			isSubmit: false,
			displayValue: ''
		};
	}

	public componentDidMount() {
		// const autoLogin = !!CookieUtils.readCookie('autoLogin');
		// const userInfo = CookieUtils.readCookie('userInfo') || '{}';
		this.props.form.setFieldsValue({ password: '', account: '' });
		// this.setState({ autoLogin }, () => {
		// 	autoLogin && setTimeout(() => this.onSubmit(), 1000)
		// })
	}

	public onFocus = (focus) => {
		// const password = this.props.form.getFieldValue('password');
		this.setState({ type: 'password' })
	};

	public onNameChange = () => {
		setTimeout(() => this.props.form.setFieldsValue({ password: '' }), 0)
	};

	public onPasswordChange = (e) => {
		const password = this.props.form.getFieldValue('password');
		const value = e.target.value;
		if (!password && value.length > 1) {
			setTimeout(() => this.props.form.setFieldsValue({ password: '' }), 0);
			this.setState({ displayValue: '' });
			return;
		}
		const displayValue = value.split('').reduce((a, b) => a + '•', '');
		this.setState({ displayValue })
	};

	public onSubmit = (e?) => {
		e && e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (err) {
				this.setState({ isSubmit: false });
				return;
			}
			this.setState({ isSubmit: true },()=>{
				this.$accountService.accountLogin(values)
					.then(resultHelper)
					.then(data => {
						goToPath(this.props, RoutePaths[Paths.INVOICE_MANAGE], {}, true)
					})
					.catch(err => {
						this.setState({ isSubmit: false });
					})
			});

		})
	};

	public onAutoLoginChange = (e) => {
		this.setState({ autoLogin: e.target.checked })
	};

	public render() {
		const f = this.props.form.getFieldDecorator;
		const password = this.props.form.getFieldValue('password');
		const { autoLogin, type, displayValue, isSubmit } = this.state;
		return (
			<div className={'container'}>
				<div className={'content'}>
					<div className={'top'}>
						<div className={'header'}>
							<Link to="/">
								<img alt="logo" className={'logo'} src={getAssetPath('logo.svg')}/>
								<span className={'title'}>泗赫云管理平台</span>
							</Link>
						</div>
						{/*<div className={'desc'}>最具影响力的物流企业</div>*/}
					</div>
					<Form className={'loginForm'}
								onSubmit={this.onSubmit}>
						<Item>
							{
								f('account', {
									rules: [FormRule.RULE_REQUIRED_MSG('请输入用户名')]
								})(
									<Input size={'large'}
												 type={'text'}
												 disabled={isSubmit}
												 onChange={this.onNameChange}
												 autoComplete={'off'}
												 placeholder={'用户名'}
												 prefix={<Icon type="user"/>}/>
								)
							}
						</Item>
						<Item>
							{
								isSubmit && <Input size={'large'}
                                   type={'text'}
                                   disabled={isSubmit}
                                   value={displayValue}
                                   placeholder={'密码'}
                                   prefix={<Icon type="lock"/>}/>
							}
							{
								!isSubmit && f('password', {
									rules: [FormRule.RULE_REQUIRED_MSG('请输入密码')]
								})(
									<Input size={'large'}
												 autoComplete={'off'}
												 type={type}
												 onChange={this.onPasswordChange}
												 onFocus={this.onFocus}
												 placeholder={'密码'}
												 prefix={<Icon type="lock"/>}/>
								)
							}
						</Item>
						{/*<Item>*/}
						{/*<Checkbox checked={autoLogin}*/}
						{/*onChange={this.onAutoLoginChange}>自动登录</Checkbox>*/}
						{/*</Item>*/}
						<Item>
							<Button type={'primary'}
											loading={isSubmit}
											style={{ width: '100%' }}
											onClick={this.onSubmit}
											size={'large'}>登录</Button>
						</Item>
					</Form>
				</div>
				{/*<FooterView/>*/}
			</div>
		);
	}
}

const Login: any = Form.create({})($Login);

export default withRouter(Login);
