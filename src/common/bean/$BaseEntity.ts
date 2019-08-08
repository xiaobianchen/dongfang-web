import { bean } from "@core/ioc";
import { beanMapper } from "@helper/Helper";

@bean($BaseEntity)
export class $BaseEntity {

	constructor(entity: any) {
		beanMapper(entity, this);
	}
}
