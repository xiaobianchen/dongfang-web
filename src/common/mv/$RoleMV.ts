import { $Role } from "@common/bean/$Role";
import { $RoleService } from "@common/services/$RoleService";
import { resultHelper } from "@core/http/helper";
import { autowired, bean } from "@core/ioc";
import { action, observable } from "mobx";

@bean($RoleMV)
export class $RoleMV {

	@autowired($RoleService)
	public $roleService: $RoleService;

	@observable
	public total: number = 0;
	@observable
	public roleList: $Role[] = [];
	@observable
	public current: number = 1;
	@observable
	public pageSize: number = 10;
	@observable
	public formData: any = { keyword: '' };
	@observable
	public modalVisible: boolean = false;
	@observable
	public item: $Role = null;

	@action
	public init = () => {
		this.total = 0;
		this.roleList = [];
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
		this.$roleService.queryRoleList({ ...this.formData, start, limit })
			.then(resultHelper)
			.then(data => {
				const { roleList, total } = data;
				this.roleList = roleList;
				this.total = total;
			})
	};

	@action
	public onSave = (params) => {
		this.$roleService.saveRole(params)
			.then(res => resultHelper(res, true))
			.then(data => {
				this.modalVisible = false;
				this.onQuery();
			})
	};

	@action
	public onDelete = (params) => {
		this.$roleService.deleteRole(params)
			.then(res => resultHelper(res, true))
			.then(data => this.onQuery())
	};

}