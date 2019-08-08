export enum RoleType {
	admin = 1, // 管理
	employee = 2, // 员工
	custom = 3, // 客户
}

export const RoleTypeMap = {
	[RoleType.admin]: '管理',
	[RoleType.employee]: '员工',
	[RoleType.custom]: '客户',
};