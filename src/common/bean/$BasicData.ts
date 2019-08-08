import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

// {
// 	"id":1,
// 	"stkCode":"",
// 	"stkName":"",
// 	"stkModel":"",
// 	"stkUom":""
// }


@bean($BasicData)
export class $BasicData extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public stkCode: string;
	@observable
	public stkName: string;
	@observable
	public stkModel: string;
	@observable
	public stkUom: string;
}