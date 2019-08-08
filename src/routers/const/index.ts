export const BASE_PATH = '/suanhu';

export enum Paths {
	INDEX = 0,
	LOGIN = 1,
	ROLE_MANAGE = 2,
	EMPLOYEE_MANAGE = 3,
	BASIC_IMPORT = 4,
	INVOICE_MANAGE = 5
}

export const RoutePaths = {
	[Paths.INDEX]: `${BASE_PATH}/index`,
	[Paths.LOGIN]: `/login`,
	[Paths.ROLE_MANAGE]: `${BASE_PATH}/management/role/list`,
	[Paths.EMPLOYEE_MANAGE]: `${BASE_PATH}/management/employee/list`,
	[Paths.BASIC_IMPORT]: `${BASE_PATH}/basic/data/import`,
	[Paths.INVOICE_MANAGE]: `${BASE_PATH}/basic/invoice/list`,
};
