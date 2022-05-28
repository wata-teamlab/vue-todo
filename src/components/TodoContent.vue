<template>
  <div>
    <div>
      <p v-if="isZero" class="notExists">登録されたToDoはございません</p>
      <table v-else v-for="(todo,index) in todos" :key="index" class="box">
        <tr>
          <td>{{ todo.title }}</td>
          <td rowspan="3" class="box edit_button">
            <router-link :to="{ name: 'edit', params: {id: todo.id}}">
              編集
            </router-link>
          </td>
          <td v-if="todo.status" rowspan="3" class="box to_unfinish_button" @click="toggleStatus(index)">未完了にする</td>
          <td v-else rowspan="3" class="box to_finish_button" @click="toggleStatus(index)">完了にする</td>
        </tr>
        <tr>
          <td>期限：{{ todo.deadline }}</td>
        </tr>
        <tr>
          <td>作成日：{{ todo.createTime }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import store from "../store.js";

export default {
  computed: {
    todos() {
      // Vuexからデータを取得する
      return this.$store.state.todos;
    },
    isZero() {
      return this.$store.state.todos.length == 0;
    }
  },
  methods: {
    toggleStatus(index) {
      store.commit("toggleStatus", index);
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
.notExists {
  color: red;
}
</style>