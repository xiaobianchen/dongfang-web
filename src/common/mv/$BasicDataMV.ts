import { $BasicData } from "@common/bean/$BasicData";
import { $Role } from "@common/bean/$Role";
import { $BasicService } from "@common/services/$BasicService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import { action, observable } from "mobx";

@bean($BasicDataMV)
export class $BasicDataMV {
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
	public importVisible: boolean = false;

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
	public setImportVisible = (importVisible) => {
		this.importVisible = importVisible;
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
		this.$basicService.queryBasicDataList({ ...this.formData, start, limit })
			.then(resultHelper)
			.then(data => {
				const { list, count } = data;
				this.list = list;
				this.count = count;
			})
	};

	@action
	public onSave = (params) => {
		this.$basicService.saveBasicData(params)
			.then(res => resultHelper(res, true))
			.then(data => {
				this.modalVisible = false;
				this.onQuery();
			})
	};

	@action
	public onDelete = (params) => {
		this.$basicService.deleteBasicData(params)
			.then(res => resultHelper(res, true))
			.then(data => this.onQuery())
	};

}