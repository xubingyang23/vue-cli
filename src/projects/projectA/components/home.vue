<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="send">传递参数</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    event: Object
  },
  methods: {
    send() {
      this.event.$emit("send", "传递参数");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this components only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
