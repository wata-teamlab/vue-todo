<template>
  <div>
    <p v-if="isFound" class="found">ToDoが{{ resultSize }}件見つかりました</p>
    <p v-else class="found">対象のToDoは見つかりません</p>
    <table v-for="(result,index) in searchResults" :key="index">
      <tr>
        <td>{{ result.title }}</td>
        <td rowspan="3" class="box edit_button">
          <router-link :to="{ name: 'edit', params: {id: result.id}}">
            編集
          </router-link>
        </td>
        <td v-if="result.status" rowspan="3" class="box to_unfinish_button" @click="toggleStatus(result.id)">未完了にする</td>
        <td v-else rowspan="3" class="box to_finish_button" @click="toggleStatus(result.id)">完了にする</td>
      </tr>
      <tr>
        <td>期限：{{ result.deadline }}</td>
      </tr>
      <tr>
        <td>作成日：{{ result.createTime }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import store from "../store.js";
import router from "../router.js";

export default {
  data() {
    return {
      title: "",
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.searchResult;
    },
    resultSize() {
      return this.$store.state.searchResult.length;
    },
    isFound() {
      return this.$store.state.searchResult.length >= 1;
    }
  },
  methods: {
    toggleStatus(index) {
      store.commit("toggleStatus", index);
      // トップページに遷移
      router.push("/");
    },
  }
}
</script>

<style scoped>
.box {
  border: 1px solid #000;
  margin-top: 20px;
}
.add_button {
  margin-left: 50px;
  background-color: skyblue;
}
.edit_button {
  background-color: lightgreen;
}
.toggle_button {
  background-color: skyblue;
}
.to_unfinish_button {
  background-color: lightcoral;
}
.to_finish_button {
  background-color: skyblue;
}
.found {
  color: red;
}
</style>