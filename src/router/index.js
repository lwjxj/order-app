/*
路由器模块
*/
import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由组件懒加载
const Msite = () => import('../pages/Msite/Miste.vue')
const Search = () => import('../pages/Search/Search.vue')
const Order = () => import('../pages/Order/Order.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },{
          path:'/shop/ratings',
          component:ShopRatings
        },{
          path:'/shop/info',
          component:ShopInfo
        },{
          path:'',
          redirect:'/shop/goods'
        }
      ]
    }
  ]
})


