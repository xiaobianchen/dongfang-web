import { Icon, Layout } from 'antd';
import React, { Fragment } from 'react';
import './index.less';

const { Footer } = Layout;

const links = [
	{
		key: 'help',
		title: '帮助',
		href: '',
	},
	{
		key: 'privacy',
		title: '隐私',
		href: '',
	},
	{
		key: 'terms',
		title: '条款',
		href: '',
	},
];

const FooterView = () => (
	<Footer style={{ padding: 0 }}>
		<div className={'antd-pro-global-footer-globalFooter'}>
			<div className="antd-pro-global-footer-links">
				{
					links.map((item, index) => <a href={item.href}
																				key={item.key}>
						{item.title}
					</a>)
				}
			</div>
			<Fragment>
				Copyright <Icon type="copyright"/> 2018 最具影响力的物流企业
			</Fragment>
		</div>
	</Footer>
);

export default FooterView;
