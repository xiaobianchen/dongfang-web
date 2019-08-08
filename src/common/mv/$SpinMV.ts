import { $Spin } from "@common/bean/$Spin";
import { bean } from "@core/ioc";
import { action, observable } from "mobx";

@bean($SpinMV)
export class $SpinMV {
	@observable
	public $spin: $Spin | any = {};

	@action
	public setSpin = (spinning: boolean, tip?: string) => {
		this.$spin.spinning = spinning;
	}
}