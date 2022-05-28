import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"
import TodoHeader from './components/TodoHeader.vue'
import CreateInput from './components/CreateInput.vue'
import TodoContent from './components/TodoContent.vue'

Vue.config.productionTip = false

// コンポーネントをグローバル登録する
Vue.component('TodoHeader', TodoHeader);
Vue.component('CreateInput', CreateInput);
Vue.component('TodoContent', TodoContent);

new Vue({
  router, // routerを登録する
  store, // storeを登録する
  render: h => h(App),
}).$mount('#app')
