import { $AccountInfo } from "@common/bean/$AccountInfo";
import { $HeaderMenuMV } from "@common/mv/$HeaderMenuMV";
import { $AccountService } from "@common/services/$AccountService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import { goToPath } from "@helper/Helper";
import { Paths, RoutePaths } from "@routers/const";
import { action, computed, observable } from "mobx";

@bean($AccountInfoMV)
export class $AccountInfoMV {

	@autowired($AccountService)
	public $accountService: $AccountService;

	@autowired($HeaderMenuMV)
	public $headerMenuMV: $HeaderMenuMV;

	@observable
	public $accountInfo: $AccountInfo = null;

	@computed
	public get isAdmin() {
		return this.$accountInfo && this.$accountInfo.type === 1;
	}

	@action
	public queryAccountInfo = (props) => {
		this.$accountService.accountInfo()
			.then(resultHelper)
			.then(data => {
				const { type } = data;
				if (type !== 1) {
					this.$headerMenuMV.$menuItems.splice(0, 1);
					const pathname = props.location.pathname;
					if (pathname.indexOf('management') !== -1) {
						goToPath(props, RoutePaths[Paths.INVOICE_MANAGE], {}, true, true);
					}
				}
				this.$headerMenuMV.showMenu=true;
				this.$accountInfo = data;
			})
	}
}