import { forIn } from "lodash";

/**
 * 获取图片途径
 * @param {string} pathname
 * @returns {string}
 */
export const getAssetPath = (pathname: string) => {
	return `//jiangzheinfo.oss-cn-hangzhou.aliyuncs.com/mini-weixin-web/assets/imgs/${pathname}`;
	// return `//suanhu.oss-cn-hangzhou.aliyuncs.com/mini-weixin-web/assets/imgs/${pathname}`;
	// return `//localhost:3000/assets/wl/${pathname}`;
};

/**
 * 跳转链接
 * @param context
 * @param {string} pathname
 * @param {{}} query
 * @param replace
 * @param refresh
 */
export const goToPath = (context: any, pathname: string, query = {}, replace?: boolean, refresh?: boolean) => {
	// const newQuery = { ...context.location.query, ...query };
	const keys = Object.keys(query);
	let search = ``;
	keys.forEach((key, index) => search += `${key}=${query[key]}${index === keys.length - 1 ? "" : "&"}`);
	if (refresh) {
		if (replace) {
			window.location.replace(`${pathname}?${search}`);
		} else {
			window.location.href = `${pathname}?${search}`;
		}
	} else {
		if (replace) {
			context.history.replace({ pathname, search });
		} else {
			context.history.push({ pathname, search });
		}
	}
};

// attribute map : {[targetKey]: [custom source key]}
// eg. map class A {a: 1, b: 2} to class B {b, c}  expect: a -> c, B {b: 2, c: 1}
// attributeMap is { "c": "a" }
export function beanMapper(source: any, target: any, attributeMap?: Map<string, string>) {
	const sourceObj: any = { ...source };
	forIn(sourceObj, (value, key) => {
		const sourceKey = key;
		let targetKey = key;
		if (attributeMap) {
			attributeMap.forEach((aValue, aKey) => {
				if (aValue === sourceKey) {
					targetKey = aKey;
				}
			});
		}
		if (sourceKey in source) {
			target[targetKey] = source[sourceKey];
		}
	});
	return target;
}
