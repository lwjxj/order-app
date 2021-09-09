/*
入口js
*/

import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer'  // 执行mockServer即可

Vue.component(Button.name, Button)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store // 注册store
})
