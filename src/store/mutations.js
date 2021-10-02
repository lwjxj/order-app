/*
保函多个直接更新state的方法的对象
*/

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  SAVE_USER,
  RESET_USER,
  RECEIVE_SHOPINFO,
  RECEIVE_SHOP_RATING,
  RECEIVE_SHOP_GOODS,
  INCREMENT_FOOD_COUNT, DECREMENT_FOOD_COUNT, CLEAR_CART, SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS](state,{address}){
    state.address = address
  },

  [RECEIVE_CATEGORYS](state,{categorys}) {
    state.categorys = categorys
  },

  [RECEIVE_SHOPS](state,{shops}){
    state.shops = shops
  },

  [SAVE_USER](state,{user}){
    state.user = user
  },

  [RESET_USER](state){
    state.user = {}
  },

  // 获取商家信息
  [RECEIVE_SHOPINFO](state,{shopInfo}){
    state.shopInfo = shopInfo
  },

  // 获取商家评价列表
  [RECEIVE_SHOP_RATING](state,{shopRatings}){
    state.shopRatings = shopRatings
  },

  // 获取商家商品列表
  [RECEIVE_SHOP_GOODS](state,{shopGoods}){
    state.shopGoods = shopGoods
  },

  // 增加食品数量
  [INCREMENT_FOOD_COUNT](state,{food}){
    // 第一次增加时，没有count属性，默认设为1
    if(!food.count){
      // 给有数据绑定的对象添加一个新的属性时，不能直接添加，需要使用Vue.set()，不然监视不到数据的变化，从而界面不会发生变化
      Vue.set(food,'count',1)
      // 添加到购物车中
      state.shopCart.push(food)
    }else {
      food.count++
    }
  },

  // 减少食品数量
  [DECREMENT_FOOD_COUNT](state,{food}){
    if(food.count){ // count有值才减1
      food.count--
      if(food.count === 0){// 如果数量减为0，从购物车中移除
        state.shopCart.splice(state.shopCart.indexOf(food),1)
      }
    }
  },

  // 清空购物车
  [CLEAR_CART](state){
    // 清除food中的count
    state.shopCart.forEach(food => food.count = 0)
    // 清空购物车中的物品
    state.shopCart = []
  },

  // 搜索商家
  [SEARCH_SHOPS](state, {searchShops}) {
    state.searchShops = searchShops
  },
}
