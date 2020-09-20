"use strict";

import Vue from "vue";
import axios from "axios";
import QS from "qs";

axios.defaults.baseURL = "/mtrade-service/api";
axios.defaults.timeout = 10000;
//axios.defaults.headers.common['Authorization'] = store.state.token;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

let config = {};

const _axios = axios.create(config);

_axios.interceptors.request.use(
	config => {
		return config;
	},
	error => {
		return Promise.error(error);
	}
);

// Add a response interceptor
_axios.interceptors.response.use(
	response => {
		// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
		// 否则的话抛出错误
		let data = response.data[0];
		if (response.status === 200) {
			if (data.result == "000000") {
				return Promise.resolve(data.data);
			} else {
				return Promise.reject(data.msg);
			}
		} else {
			return Promise.reject(`状态码异常！(${response.status})`);
		}
	},
	error => {
		return Promise.reject(error);
	}
);

export default {
	POST(code, params) {
		let obj = [{
			api: code,
			params: params
		}];
		let data = {
			TOKEN: "1", //store.state.token
			directives: JSON.stringify(obj)
		};
		return new Promise((resolve, reject) => {
			_axios.post("", QS.stringify(data))
				.then(res => {
					resolve(res);
				})
				.catch(err => {
					Vue.prototype.$message.error(err);
					reject(err);
				});
		});
	}
};
