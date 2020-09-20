import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

/* 配置文件  */
var conf = {
	"MARKET_ID": "F115",
	"MARKET_NAME": "产业电商B",
};

Vue.prototype.$conf = conf;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
