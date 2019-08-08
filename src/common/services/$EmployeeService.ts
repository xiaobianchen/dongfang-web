import AjaxUtils from "@core/http";
import { bean } from "@core/ioc";

@bean($EmployeeService)
export class $EmployeeService {

	public queryEmployeeList = (params) => {
		return AjaxUtils.post('/user/fuzzySearch', params)
	};

	public checkMobile= (params) => {
		return AjaxUtils.post('/user/checkMobile', params);
	};

	public saveEmployee= (params) => {
		return AjaxUtils.post('/user/save', params);
	};

	public deleteEmployee= (params) => {
		return AjaxUtils.post('/user/deleteById', params);
	};

	public queryUser= () => {
		return AjaxUtils.get('/user/checkMobile', {});
	};


}