import { $Employee } from "@common/bean/$Employee";
import { $EmployeeService } from "@common/services/$EmployeeService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import { action, observable } from "mobx";

@bean($EmployeeMV)
export class $EmployeeMV {
	@autowired($EmployeeService)
	public $employeeService: $EmployeeService;
	@observable
	public total: number = 0;
	@observable
	public list: $Employee[] = [];
	@observable
	public current: number = 1;
	@observable
	public pageSize: number = 10;
	@observable
	public formData: any = { keyword: '' };
	@observable
	public modalVisible: boolean = false;
	@observable
	public item: $Employee = null;

	@action
	public init = () => {
		this.total = 0;
		this.list = [];
		this.pageSize = 10;
		this.current = 1;
		this.modalVisible = false;
		this.formData = { keyword: '' }
	};

	@action
	public setVisible = (modalVisible, item?) => {
		this.modalVisible = modalVisible;
		this.item = item;
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
		this.$employeeService.queryEmployeeList({ ...this.formData, start, limit })
			.then(resultHelper)
			.then(data => {
				const { list, total } = data;
				this.list = list;
				this.total = total;
			})
	};

	@action
	public checkMobile = (parmas, callback) => {
		this.$employeeService.checkMobile(parmas)
			.then((res: any) => {
				const { code, msg } = res;
				if (code === 200) {
					callback()
				} else {
					callback(msg)
				}
			})
	};

	@action
	public onSave = (params) => {
		this.$employeeService.saveEmployee(params)
			.then(res => resultHelper(res, true))
			.then(data => {
				this.modalVisible = false;
				this.onQuery();
			})
	};

	@action
	public onDelete = (params) => {
		this.$employeeService.deleteEmployee(params)
			.then(res => resultHelper(res, true))
			.then(data => this.onQuery())
	};
}