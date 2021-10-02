/*
包含多个基于state的getter计算属性的对象
*/

export default {
  // 购物车商品总数量
  totalCount (state) {
    return state.shopCart.reduce((pre,food) => pre + food.count,0)
  },

  // 购物车商品总价格
  totalPrice(state) {
    return state.shopCart.reduce((pre,food) => pre + food.count*food.price,0)
  },

  // 满意的评价数量
  positiveAmount(state) {
    return state.shopRatings.reduce((pre,rating) => pre + (rating.rateType === 0 ? 1 : 0),0)
  }
}
