/*
保函多个直接更新state的方法的对象
*/

import {RECEIVE_ADDRESS,RECEIVE_CATEGORYS,RECEIVE_SHOPS,SAVE_USER,RESET_USER,RECEIVE_SHOPINFO,RECEIVE_SHOP_RATING,RECEIVE_SHOP_GOODS} from './mutation-types'

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
}
