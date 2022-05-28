import Vue from 'vue';
import Router from 'vue-router';

import CreateInput from "./components/CreateInput.vue";
import TodoContent from "./components/TodoContent.vue";
import EditInput from "./components/EditInput.vue";
import SearchInput from "./components/SearchInput.vue";
import SearchResult from "./components/SearchResult.vue";
import NotFoundError from "./components/NotFoundError.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // URLの「#」を消す
  // URLとコンポーネントをマッピングする
  // props: true にすると、URL内のパラメータをpropsとして取得できる
  routes: [
    {
      path: '/', // トップページ
      components: { // <router-vue>に入れるコンポーネントを指定する
        input: CreateInput,
        default: TodoContent
      },
      name: 'top'
    },
    {
      path: '/edit/:id', // TODO編集画面
      components: {
        input: EditInput
      },
      name: 'edit'
    },
    {
      path: '/search', // TODO検索画面
      components: {
        input: SearchInput
      },
      name: 'search'
    },
    {
      path: '/search/result', // TODO検索結果画面
      components: {
        input: SearchInput,
        default: SearchResult
      },
      name: 'search_result'
    },
    {
      path: '*',
      components: {
        default: NotFoundError
      }
    }
  ]
});