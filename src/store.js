import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// データの管理
export default new Vuex.Store({
  state: {
    todos: [], // Todoリスト
    searchResult: [], // 検索結果
    errorMessages: [], // エラーメッセージ
  },
  getters: {
    getTodos(state) {
      return state.todos;
    }
  },
  mutations: {
    // Todo新規作成
    saveTodo(state, {title, deadline}) {
      const id = state.todos.length;
      // 期限のフォーマットを整える
      const newDeadline = new Date(deadline);
      const formatDeadline = newDeadline.getFullYear() + "年" + (newDeadline.getMonth()+1) + "月" + newDeadline.getDate() + "日";
      const today = new Date();
      // 作成日時・更新日時のフォーマットを整える
      const formatToday = today.getFullYear() + "年" + (today.getMonth()+1) + "月" + today.getDate() + "日";

      state.todos.push({
        id: id,
        title: title,
        deadline: formatDeadline,
        status: false,
        createTime: formatToday,
        updateTime: formatToday
      });

      // Todoを、作成日時が新しい順にソートする
      state.todos = state.todos.sort(function(a, b) {
        return (a.createTime > b.createTime) ? -1 : 1;
      })
    },

    // 完了・未完了を切り替える
    toggleStatus(state, index) {
      state.todos[index].status = !state.todos[index].status;
    },

    // Todo更新
    updateTodo(state, {id, title, deadline}) {
      // id, title, deadline, status, createTime, updateTime
      state.todos[id].title = title;
      state.todos[id].deadline = deadline;
      const today = new Date();
      // 作成日時・更新日時のフォーマットを整える
      const formatToday = today.getFullYear() + "年" + (today.getMonth()+1) + "月" + today.getDate() + "日";
      state.todos[id].updateTime = formatToday;
    },

    // タイトル部分一致、かつ未完了のものを取得する
    searchTodo(state, query) {
      // 検索結果をリセットする
      state.searchResult = [];

      // 検索する
      for(let todo of state.todos) {
        // タイトルが部分一致したとき
        if(todo.title.indexOf(query) > -1) {
          // 未完了のとき
          if(todo.status == false) {
            console.log(todo.title);
            // 検索結果に追加する
            state.searchResult.push(todo);
          }
        }
      }

      // 検索結果を、作成日時が新しい順にソートする
      state.searchResult = state.searchResult.sort(function(a, b) {
        return (a.createTime > b.createTime) ? -1 : 1;
      })
    },

    // エラーメッセージを保存する
    saveErrorMessage(state, errorMessages) {
      state.errorMessages = errorMessages;
    }
  }
});