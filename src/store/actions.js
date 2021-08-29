/*
* 包含多个事件回调函数的对象
* 通过执行commit()来触发mutation的调用，间接更新state
* 谁来触发：组件中$store.dispatch('action名称',data1)
* 可以包含异步代码（定时器，ajax）
* */

import {reqAddress, reqCategorys, reqShops} from '../api'
import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,SAVE_USER,RESET_USER} from './mutation-types'

export default {
  // 异步获取地址
  async getAddress({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 提交一个mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取 msite 页面食品分类列表
  async getCategorys({commit}) {
    const result = await reqCategorys()
    if(result.code === 0){
      const categorys = result.data
      commit(RECEIVE_CATEGORYS,{categorys})
    }
  },

  // 异步获取商铺列表
  async getShops({commit,state}) {
    const result = await reqShops(state.latitude,state.longitude)
    if(result.code === 0){
      const shops = result.data
      commit(RECEIVE_SHOPS,{shops})
    }
  },

  // 同步保存用户信息
  saveUser({commit},user){
    commit(SAVE_USER,{user})
  },

  // 同步清除用户信息
  resetUser({commit}){
    commit(RESET_USER)
  }
}
