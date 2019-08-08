import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

// {
// 	"id": 1,
// 	"number": 1,
// 	"impa": "",
// 	"description": "",
// 	"remark": "",
// 	"unit": "",
// 	"qty": "",
// 	"unitPrice": 1.1,
// 	"amount": 1.2,
// 	"imagePath": "",
// 	"comment": "",
// 	"sendOrderId": ""
// }

@bean($Product)
export class $Product extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public number: number;
	@observable
	public impa: string;
	@observable
	public description: string;
	@observable
	public remark: string;
	@observable
	public unit: string;
	@observable
	public qty: string;
	@observable
	public unitPrice: number;
	@observable
	public amount: number;
	@observable
	public imagePath: string;
	@observable
	public comment: string;
	@observable
	public sendOrderId: string;
	@observable
	public status:number;
}