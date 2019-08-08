import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

@bean($Invoice)
export class $Invoice extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public orderNumber: string;
	@observable
	public creator: string;
	@observable
	public status: number;
	@observable
	public userId: number;
	@observable
	public receiver: number;
	@observable
	public createTime: number;
	@observable
	public updateTime: number;
	@observable
	public customerId: number;
}