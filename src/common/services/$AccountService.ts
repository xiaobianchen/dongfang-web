import AjaxUtils from "@core/http";
import { bean } from "@core/ioc";

@bean($AccountService)
export class $AccountService {

	public accountLogin = (parmas) => {
		return AjaxUtils.post('/login', parmas)
	};

	public accountLogout = () => {
		return AjaxUtils.get('/logOut', {})
	};

	public accountInfo = () => {
		return AjaxUtils.get('/info', {})
	};

	public modifyPassword=(params)=>{
		return AjaxUtils.post('/modifyPassword',params);
	}
}