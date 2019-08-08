import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

@bean($Spin)
export class $Spin extends $BaseEntity {
	@observable
	public delay?: number = 200;
	@observable
	public size?: 'default' | 'large' | 'small' = 'default';
	@observable
	public spinning: boolean = false;
	@observable
	public tip?: string;
}