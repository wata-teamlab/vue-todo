<template>
  <div class="box">
    <p>ToDoの内容を変更します
    </p>
    <table>
      <tr>
        <td>ToDo名</td>
        <td><input type="text" name="title" v-model="title" /></td>
        <td rowspan="2" class="box add_button" @click="updateTodo()">
          <router-link to=''>更新</router-link>
        </td>
      </tr>
      <tr>
        <td>期限</td>
        <td><input type="text" name="deadline" v-model="deadline" /></td>
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
      title: this.$store.state.todos[this.$route.params.id].title,
      deadline: this.$store.state.todos[this.$route.params.id].deadline,
      todos: this.$store.state.todos
    }
  },
  methods: {
    updateTodo() {
      // Vuexにアクセスする
      store.commit(
        "updateTodo", 
        {
          id: this.$route.params.id, 
          title: this.title, 
          deadline: this.deadline
        }
      );

      // URL遷移
      router.push("/");
    }
  },
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
</style>