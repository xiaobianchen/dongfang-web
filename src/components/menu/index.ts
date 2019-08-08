import { $MenuItem } from "@common/bean/$MenuItem";
import { Paths, RoutePaths } from "@routers/const";

const menuItems: $MenuItem[] = [
	{
		name: '组织管理',
		icon: 'profile',
		key: '100',
		children: [
			{
				name: '角色管理',
				key: '110',
				icon: 'profile',
				url: RoutePaths[Paths.ROLE_MANAGE],
				children: []
			},
			{
				name: '用户管理',
				key: '120',
				icon: 'profile',
				url: RoutePaths[Paths.EMPLOYEE_MANAGE],
				children: []
			}
		],
	}, {
		name: '基础数据',
		icon: 'profile',
		key: '200',
		children: [
			{
				name: '导入基础数据',
				icon: 'profile',
				key: '210',
				url: RoutePaths[Paths.BASIC_IMPORT],
				children: []
			},
			{
				name: '发货单管理',
				key: '220',
				icon: 'profile',
				url: RoutePaths[Paths.INVOICE_MANAGE],
				children: []
			}
		],
	}
];

export default menuItems;