/*
入口js
*/

import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import App from './App'
import router from './router'
import store from './store'
import loading from './common/imgs/loading.gif'
import './mock/mockServer'  // 执行mockServer即可
import './filters'

Vue.component(Button.name, Button)
// 自定义指令lazy
Vue.use(VueLazyload,{
  loading
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store // 注册store
})
