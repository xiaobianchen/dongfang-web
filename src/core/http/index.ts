import MessageHelper from '@helper/MessageHelper';
import { Paths, RoutePaths } from "@routers/const";
import axios from 'axios';
import { isEmpty } from "lodash";

const isProd = process.env.NODE_ENV !== 'development';

const BASE_URL = '';

const ERROR_MSG = {
	code: 500,
	message: '网络故障'
};

const axiosInstance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	}
});

axiosInstance.interceptors.request.use(
	(config: any) => {
		MessageHelper.loading();
		return config;
	},
	err => {
		MessageHelper.hide();
		return Promise.reject(err);
	}
);

axiosInstance.interceptors.response.use(
	response => {
		const contentType = response.headers['content-type'];
		if (contentType.toLowerCase().indexOf("text/html;") !== -1) {
			window.location.replace(RoutePaths[Paths.LOGIN]);
		}
		MessageHelper.hide();
		return response;
	},
	error => {
		MessageHelper.hide();
		return Promise.reject(ERROR_MSG);
	}
);

const AjaxUtils = {
	get: (url: string, params: any) => {
		return new Promise((resolve, reject) => {
			axiosInstance
				.get(`${url}`, { params })
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					if (!isEmpty(err && err.message)) {
						MessageHelper.error(err.message);
					}
					reject(ERROR_MSG);
				});
		});
	},
	post: (url: string, params: any) => {
		return new Promise((resolve, reject) => {
			axiosInstance
				.post(`${url}`, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(err => {
					if (!isEmpty(err && err.message)) {
						MessageHelper.error(err.message);
					}
					reject(ERROR_MSG);
				});
		});
	}
};

export default AjaxUtils;
