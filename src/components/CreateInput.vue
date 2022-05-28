<template>
  <div>
    <div class="box">
      <p>新しいToDoを作成する</p>
      <table>
        <tr>
          <td><label for="title">ToDo名</label></td>
          <td><input type="text" v-model="title" /></td>
          <td rowspan="2">
            <button class="box add_button" @click="createTodo()">ToDoの追加</button>
          </td>
        </tr>
        <tr>
          <td><label for="deadline">期限</label></td>
          <td><input type="date" v-model="deadline" /></td>
        </tr>
      </table>
    </div>
    <div v-for="(errorMessage,index) in errorMessages" :key="index">
      <p class="error_message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import store from "../store.js";

export default {
  data() {
    return {
      title: "",
      deadline: "",
    } 
  },
  computed: {
    errorMessages() {
      return this.$store.state.errorMessages;
    }
  },
  methods: {
    // Todo新規作成
    createTodo() {
      let isError = 0;
      let errorMessages = [];

      // Todo名が空ならエラーを出す
      if(this.title == "" || this.title == null) {
        errorMessages.push("タイトルを入力してください");
        isError = 1;
      }

      // Todo名が31文字以上ならエラーを出す
      if(this.title.length >= 31) {
        errorMessages.push("タイトルを30文字以内にしてください");
        isError = 1;
      }

      // Todo名が既に存在するならエラーを出す
      const todos = this.$store.state.todos;
      for(let todo of todos) {
        console.log(todo.title);
        if(todo.title == this.title) {
          errorMessages.push("Todo名が既に存在します");
          isError = 1;
        }
      }

      // 期限が空ならエラーを出す
      if(this.deadline == "" || this.deadline == null) {
        errorMessages.push("期限を入力してください");
        isError = 1;
      }

      // エラーメッセージをVuexに保存する
      store.commit("saveErrorMessage", errorMessages);

      // エラーが出ていれば終了
      if(isError == 1) {
        return;
      }
      
      // TodoをVuexに保存する
      store.commit("saveTodo", {title: this.title, deadline: this.deadline});

      this.title = "";
      this.deadline = "";
    },
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
.error_message {
  color: red;
}
</style>