import AppRouter from "@routers/index";
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.less'

// configure({ enforceActions: true });

declare const window: any;
const reactMountPoint = 'react-app';

const render = (Component: any) => {
	ReactDOM.render(
		<LocaleProvider locale={zhCN}>
			<Component/>
		</LocaleProvider>,
		document.getElementById(reactMountPoint) as HTMLElement,
	);
};

render(AppRouter);


