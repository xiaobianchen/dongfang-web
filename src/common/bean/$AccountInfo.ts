import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

// {"customerId":1,"account":"admin","userId":1,"userName":"admin","type":1}

@bean($AccountInfo)
export class $AccountInfo extends $BaseEntity {
	@observable
	public customerId: number;
	@observable
	public account: string;
	@observable
	public userId: number;
	@observable
	public userName: string;
	@observable
	public type: number;
}