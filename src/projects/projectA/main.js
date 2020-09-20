import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import * as api from "../../common/api/index.js";

/* 配置文件  */
var conf = {
	MARKET_ID: "F115",
	MARKET_NAME: "产业电商A",
	dev_params: "http://1.192.121.238:27084/mtrade-service/api",
	build_params: "http://farm.fv0536.com/mtrade-service/api"
};

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$conf = conf;
Vue.prototype.$api = api;

Vue.use(ElementUI);

new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
