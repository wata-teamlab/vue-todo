<template>
  <div class="header">
    <h1 class="title">
      <router-link :to="{name: 'top'}" class="title">TODOリスト</router-link>
    </h1>
    <router-link :to="{name: 'search'}" class="to_search">検索</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
  background-color: skyblue;
}
.title {
  display: inline-block;
  color: black;
}
.to_search {
  display: inline-block;
  font-size: 25px;
  color: green;
  margin-left: 100px;
  margin-right: 20px;
}
</style>