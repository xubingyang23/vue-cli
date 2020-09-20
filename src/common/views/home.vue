<template>
	<div class="home">
		<img alt="Vue logo" src="@/assets/logo.png" />
		<Home :msg="marketName" />
		<!-- <apply-drawer :list="list"></apply-drawer>
    <button @click="sendPost">获取接口信息</button> -->
	</div>
</template>

<script>
// @ is an alias to /src
import Home from '../../projects/projectA/components/home.vue';
import ApplyDrawer from '../components/apply-drawer';
import QS from 'qs';

export default {
	name: 'home',
	components: {
		ApplyDrawer,
		Home
	},
	data() {
		return {
			list: [{ name: '项目A', desc: '项目A描述抽屉组件' }],
			marketName: ''
		};
	},
	mounted() {
		this.marketName = this.$conf.MARKET_NAME;
	},
	methods: {
		sendPost() {
			let obj = { QUERYALL: '1', QKEYWORD: null, PAGESTART: 0, PAGESIZE: 3 };
			var data = { directives: JSON.stringify([{ api: 'NZ0013', params: obj }]) };
			this.$http.post('', QS.stringify(data)).then(res => {
				console.log(res);
			});
		}
	}
};
</script>
