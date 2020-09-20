import Vue from "vue";
import http from "../../plugins/axios.js";

//测试接口
export const queryList = ops => {
	let param = {
		QUERYALL: ops.type || "1",
		PAGESTART: 0,
		PAGESIZE: 10
	};
	return http.POST("NZ0013", param);
};
