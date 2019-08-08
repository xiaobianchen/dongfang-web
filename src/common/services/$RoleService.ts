import AjaxUtils from "@core/http";
import { bean } from "@core/ioc";

@bean($RoleService)
export class $RoleService {

	public queryRoleList = (params) => {
		return AjaxUtils.post('/role/fuzzySearch', params)
	};

	public saveRole = (params) => {
		return AjaxUtils.post('/role/save', params)
	};

	public deleteRole = (params) => {
		return AjaxUtils.post('/role/delete', params)
	}

}