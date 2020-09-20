<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
	
	<div>{{msg}}</div>
  </div>
</template>

<script>
	import Vue from "Vue"
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
	  msg:""
    };
  },
	created() {
		console.log(this.$route.params);
	},
	beforeRouteEnter (to, from, next) {
		console.log("#####");
		Vue.prototype.$api
		  .queryList({ type: "1" })
		  .then(res => {
		    next(vm => vm.setData(to.params.id));
		  })
		  .catch(error => {
		    next();
		  });
    },
    // 路由改变前，组件就已经渲染完了
    // 逻辑稍稍不同
    beforeRouteUpdate (to, from, next) {
		this.msg = '';
		console.log("@@@@");
		this.$api
		  .queryList({ type: "1" })
		  .then(res => {
			this.setData(to.params.id);
		    next();
		  })
		  .catch(error => {
		    next();
		  });
    },
    methods: {
      setData (msg) {
        this.msg = msg;
      }
    }
};
</script>
