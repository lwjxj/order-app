/*
* 包含多个事件回调函数的对象
* 通过执行commit()来触发mutation的调用，间接更新state
* 谁来触发：组件中$store.dispatch('action名称',data1)
* 可以包含异步代码（定时器，ajax）
* */

import {reqAddress, reqCategorys, reqShopInfo, reqShopRatings, reqShops, reqUser,reqShopGoods} from '../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USER,
  RESET_USER,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOP_RATING,
  RECEIVE_SHOP_GOODS,
  INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT
} from './mutation-types'

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

  // 异步获取用户信息
  async getUserInfo({commit}){
    const result = await reqUser()
    if(result.code === 0){
      const user = result.data
      commit(SAVE_USER,{user})
    }
  },

  // 同步保存用户信息
  saveUser({commit},user){
    commit(SAVE_USER,{user})
  },

  // 同步清除用户信息
  resetUser({commit}){
    commit(RESET_USER)
  },

  // 异步获取商家信息
  async getShopInfo({commit}){
    const result = await reqShopInfo()
    if(result.code === 0){
      const shopInfo = result.data
      commit(RECEIVE_SHOPINFO,{shopInfo})
    }
  },

  // 异步获取商家评价列表
  async getShopRatings({commit}){
    const result = await reqShopRatings()
    if(result.code === 0){
      const shopRatings = result.data
      commit(RECEIVE_SHOP_RATING,{shopRatings})
    }
  },

  // 异步获取商家商品列表
  async getShopGoods({commit},callback){
    const result = await reqShopGoods()
    if(result.code === 0){
      const shopGoods = result.data
      commit(RECEIVE_SHOP_GOODS,{shopGoods})
      callback && callback()
    }
  },

  // 更新食品数量
  updateFoodCount({commit},{food,isAdd}){
    if(isAdd){ // 增加
      commit(INCREMENT_FOOD_COUNT,{food})
    }else {// 减少
      commit(DECREMENT_FOOD_COUNT,{food})
    }
  }
}
