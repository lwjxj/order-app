/*
vuex的核心管理对象store对象模块
*/

import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
export default new Vuex.Store({
  state,
  actions,
  mutations
})
