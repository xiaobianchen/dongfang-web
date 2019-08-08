import { Paths, RoutePaths } from "@routers/const";
import Exception from 'ant-design-pro/lib/Exception';
import 'ant-design-pro/lib/Exception/style/index.less';
import { Button } from "antd";
import React from "react";

const NotFound = () =>
	<Exception type="404"
						 actions={<a href={RoutePaths[Paths.ROLE_MANAGE]}><
							 Button type={'primary'}>返回首页</Button>
						 </a>}/>;

export default NotFound;

