import { $BasicData } from "@common/bean/$BasicData";
import { $Role } from "@common/bean/$Role";
import { $BasicService } from "@common/services/$BasicService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import { action, observable } from "mobx";

@bean($InvoiceMV)
export class $InvoiceMV {

	@autowired($BasicService)
	public $basicService: $BasicService;
	@observable
	public count: number = 0;
	@observable
	public list: $Role[] = [];
	@observable
	public current: number = 1;
	@observable
	public pageSize: number = 10;
	@observable
	public formData: any = { keyword: '' };
	@observable
	public modalVisible: boolean = false;
	@observable
	public item: $BasicData = null;
	@observable
	public detailsVisible: boolean = false;
	@observable
	public remarkVisible: boolean = false;


	@action
	public init = () => {
		this.count = 0;
		this.list = [];
		this.modalVisible = false;
		this.pageSize = 10;
		this.current = 1;
		this.formData = { keyword: '' }
	};

	@action
	public setVisible = (modalVisible, item?) => {
		this.modalVisible = modalVisible;
		this.item = item;
	};

	@action
	public setRemarkVisible = (remarkVisible, item?) => {
		this.remarkVisible = remarkVisible;
		this.item = item;
	};

	@action
	public setDetailsVisible = (detailsVisible) => {
		this.detailsVisible = detailsVisible;
	};

	@action
	public onSearch = (formData) => {
		this.formData = formData;
		this.current = 1;
		this.pageSize = 10;
		this.onQuery();
	};

	@action
	public onChange = (current, pageSize) => {
		this.current = current;
		this.pageSize = pageSize;
		this.onQuery();
	};

	@action
	public onQuery = () => {
		const start = (this.current - 1) * this.pageSize;
		const limit = this.pageSize;
		this.$basicService.queryInvoiceList({ ...this.formData, start, limit })
			.then(resultHelper)
			.then(data => {
				const { list, count } = data;
				this.list = list;
				this.count = count;
			})
	};

	@action
	public onSave = (params, formData) => {
		this.$basicService.saveInvoice(params)
			.then(resultHelper)
			.then(data => {
				formData.append('sendOrderId', data + '');
				this.onUpload(formData);
			})
	};

	@action
	public onUpload = (formData) => {
		this.$basicService.uploadProductExcel(formData)
			.then(res => resultHelper(res, true))
			.then(data => {
				this.modalVisible = false;
				this.onQuery();
			})
	};

	@action
	public onDelete = (params) => {
		this.$basicService.deleteInvoice(params)
			.then(res => resultHelper(res, true))
			.then(data => this.onQuery())
	};

	@action
	public onRemark = (params) => {
		this.$basicService.updateInvoiceRemark(params)
			.then(res => resultHelper(res, true))
			.then(data => {
				this.remarkVisible = false;
				this.onQuery()
			})
	}
}