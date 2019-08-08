import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

@bean($MenuItem)
export class $MenuItem extends $BaseEntity {
	@observable
	public name: string;
	@observable
	public icon: string;
	@observable
	public key: string;
	@observable
	public url?: string;
	@observable
	public pathname?: string;
	@observable
	public isOutSite?: boolean = false;
	@observable
	public children?: $MenuItem[] = [];
	@observable
	public parentItem?: $MenuItem;
}