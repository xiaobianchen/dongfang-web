import AjaxUtils from "@core/http";
import { bean } from "@core/ioc";

@bean($BasicService)
export class $BasicService {

	public uploadProductExcel = (params) => {
		return AjaxUtils.post('/excel/importExcel?type=2', params)
	};

	public queryBasicDataList = (params) => {
		return AjaxUtils.post('/sendOrder/product/fuzzySearch', params)
	};

	public queryBasicDataInfo = (params) => {
		return AjaxUtils.post('/sendOrder/product/loadById', params)
	};

	public saveBasicData = (params) => {
		return AjaxUtils.post('/sendOrder/product/save', params)
	};

	public deleteBasicData = (params) => {
		return AjaxUtils.post('/sendOrder/product/delete', params)
	};

	public queryInvoiceList = (params) => {
		return AjaxUtils.post('/sendOrder/fuzzySearch', params)
	};

	public deleteInvoice = (params) => {
		return AjaxUtils.post('/sendOrder/delete', params)
	};

	public saveInvoice = (params) => {
		return AjaxUtils.post('/sendOrder/save', params)
	};

	public queryInvoiceProducts = (params) => {
		return AjaxUtils.post('/sendOrder/queryAllProduct', params)
	};

	public updateInvoiceProductStatus = (params) => {
		return AjaxUtils.post('/sendOrder/updatePurchaseStatusBySendOrderId', params);
	};

	public updateInvoiceProduct = (params) => {
		return AjaxUtils.post('/sendOrder/purchaseOrder/save', params);
	};

	public updateInvoiceRemark = (params) => {
		return AjaxUtils.post('/sendOrder/updateRemark', params);
	}
}