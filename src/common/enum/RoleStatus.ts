export enum RoleStatus {
	open = 1, // 开启
	close = 2, // 关闭
}

export const RoleStatusMap = {
	[RoleStatus.open]: '开启',
	[RoleStatus.close]: '关闭'
};