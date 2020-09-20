<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Home msg="欢迎进入项目A范畴" :event="event" />
    <apply-drawer :list="list" :event="event"></apply-drawer>
    <button @click="sendPost">获取接口信息</button>
    <div @click="toTest" ref="btn">前往TEST</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";
import Home from "@/components/home.vue";
import ApplyDrawer from "../../../common/components/apply-drawer";

export default {
  name: "home",
  components: {
    ApplyDrawer,
    Home
  },
  data() {
    return {
      list: [{ name: "项目A", desc: "项目A描述抽屉组件" }],
      event: new Vue() // 挂载公共Vue实例
    };
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log(this.$el);
    console.log("beforeMount");
  },
  mounted() {
    console.log("@@@@@", this.$el);
    console.log("mounted");
    this.list = [{ name: "项目B", desc: "项目A描述抽屉组件" }];
    this.$nextTick(() => {
      console.log(this.$refs.btn);
    });
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  beforeUpdate() {
    console.log("before updated");
  },
  updated() {
    console.log("updated");
  },
  methods: {
    sendPost() {
      this.$api
        .queryList({ type: "1" })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    toTest() {
      this.$router.push({ name: "test" });
    }
  }
};
</script>
