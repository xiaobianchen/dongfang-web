import { $BaseEntity } from "@common/bean/$BaseEntity";
import { bean } from "@core/ioc";
import { observable } from "mobx";

// {
// 	"id": 1,
// 	"customerId": 3,
// 	"openId": "aaaa",
// 	"account": "13297123456",
// 	"password": "e10adc3949ba59abbe56e057f20f883e",
// 	"nickName": "test",
// 	"name": "test",
// 	"sex": 1,
// 	"mobile": "13297123456",
// 	"wechat": "test",
// 	"type": 1,
// 	"consultYears": 1,
// 	"levelId": 1,
// 	"imagePath": "www.baidu.com",
// 	"isSupportVIP": 1,
// 	"birthday": 1524326400000,
// 	"source": 3,
// 	"selfDesc": "test",
// 	"lastLoginTime": 1524581914000,
// 	"levelName": "dd",
// 	"uucode": 11,
// 	"qrcodeUrl": "www.baiud.com"
// }

@bean($Employee)
export class $Employee extends $BaseEntity {
	@observable
	public id: number;
	@observable
	public customerId: number;
	@observable
	public openId: string;
	@observable
	public account: string;
	@observable
	public nickName: string;
	@observable
	public name: string;
	@observable
	public mobile: string;
	@observable
	public type: number;
	@observable
	public birthday: number;
	@observable
	public uucode: string;
	@observable
	public qrcodeUrl: string;
}