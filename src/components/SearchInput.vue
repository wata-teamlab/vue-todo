<template>
  <div>
    <div>
      <input type="text" name="title" v-model="title" />
      <button class="search_button" @click="searchTodo()">
        検索
      </button>
    </div>
  </div>
</template>

<script>
import store from "../store.js";
import router from "../router.js";

export default {
  data() {
    return {
      title: "",
      searchResults: this.$store.state.searchResult,
      resultSize: this.$store.state.searchResult.length,
      isFound: this.$store.state.searchResult.length >= 1
    }
  },
  methods: {
    searchTodo() {
      // タイトル部分一致、かつ未完了のものを取得する
      store.commit("searchTodo", this.title);
      // URL遷移
      router.push({
        name: "search_result",
        query: this.title
      }).catch(() => {});
    },
  }
}
</script>

<style scoped>
.search_button {
  background-color: skyblue;
}
</style>