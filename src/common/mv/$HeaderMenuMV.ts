import { $MenuItem } from "@common/bean/$MenuItem";
import menuItems from "@components/menu";
import { bean } from "@core/ioc";
import { goToPath } from "@helper/Helper";
import { action, computed, observable } from "mobx";

@bean($HeaderMenuMV)
export class $HeaderMenuMV {

	@observable
	public $menuItems: $MenuItem[] = menuItems;

	@observable
	public $allItems: $MenuItem[] = [];

	@observable
	public $selectMenuKey: string = null;

	@observable
	public showMenu = false;

	@action
	public onMenuItemClick = (key, props) => {
		this.$selectMenuKey = key;
		const item = this.$allItems.find(item => item.key === key);
		item && goToPath(props, item.pathname, {}, true);
	};


	@action
	public init = (pathname) => {
		this.$allItems = [];
		this.makeupAllItems(this.$menuItems, null);
		const item = this.$allItems.find(item => item.pathname === pathname);
		this.$selectMenuKey = item && item.key;
	};

	@action
	public makeupAllItems = (menuItems: $MenuItem[], parentItem: $MenuItem) => {
		menuItems.forEach(item => {
			this.$allItems.push({
				...item,
				pathname: item.url,
				parentItem,
			});
			if (item.children && item.children.length !== 0) {
				this.makeupAllItems(item.children, item);
			}
		})
	};

	@computed
	public get pageTitle() {
		const item = this.$allItems.find(item => item.key === this.$selectMenuKey);
		return item && item.name;
	}

	@computed
	public get pageParentTitle() {
		const item = this.$allItems.find(item => item.key === this.$selectMenuKey);
		return item && item.parentItem && item.parentItem.name;
	}

}