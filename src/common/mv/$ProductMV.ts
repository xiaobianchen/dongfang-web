import { $Product } from "@common/bean/$Product";
import { $BasicService } from "@common/services/$BasicService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import { action, observable } from "mobx";

@bean($ProductMV)
export class $ProductMV {

	@autowired($BasicService)
	public $basicService: $BasicService;
	@observable
	public data: $Product[] = [];
	@observable
	public current: number = 1;
	@observable
	public pageSize: number = 10;
	@observable
	public formVisible = false;

	@action
	public setFormVisible = (formVisible) => {
		this.formVisible = formVisible;
	};

	@action
	public queryInvoiceProducts = (params) => {
		this.$basicService.queryInvoiceProducts(params)
			.then(resultHelper)
			.then(data => this.data = data)
	};

	@action
	public updateInvoiceProductStatus = (params, index,callback) => {
		this.$basicService.updateInvoiceProductStatus(params)
			.then(res => resultHelper(res, true))
			.then(data => {
				callback&&callback()
			})
	};

	@action
	public updateInvoiceProduct = (params, callback?) => {
		this.$basicService.updateInvoiceProduct(params)
			.then(res => resultHelper(res, true))
			.then(data => {
				this.formVisible = false;
				callback && callback();
				// this.queryInvoiceProducts({});
			})
	};

	@action
	public onChange = (current, pageSize) => {
		this.current = current;
		this.pageSize = pageSize;
	}

}