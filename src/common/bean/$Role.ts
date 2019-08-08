import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

// {
// 	"id": 1,
// 	"customerId": 0,
// 	"name": "汪",
// 	"memo": "222",
// 	"status": 0,
// 	"type": 1,
// 	"creator": 1,
// 	"createTime": 1535781355000,
// 	"updateTime": 1538450466000
// }


@bean($Role)
export class $Role extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public customerId:number;
	@observable
	public name: string;
	@observable
	public memo: string;
	@observable
	public status: number;
	@observable
	public type: number;
	@observable
	public createTime: number;
	@observable
	public updateTime: number;
}