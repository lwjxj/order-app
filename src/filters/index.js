/*
自定义Vue过滤器
*/

import Vue from 'vue'
import format from 'date-fns/format'

Vue.filter('dateFormat',function (value,formatStr='YYYY-MM-DD HH:mm:ss') {
  return format(value,formatStr)
})
