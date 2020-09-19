/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.


  // 这个util对象是Vue的api  但是不建议用户使用  
  Vue.util = {
    warn,
    extend,  // 拷贝属性到另一个对象上
    mergeOptions,
    defineReactive
  }

  // 对象只会拦截已经存在的属性 提示set和delete实现数据响应式
  Vue.set = set  // set方法
  Vue.delete = del  // delete方法
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  // 新增的方法，将对象进行观测，并返回观测后的对象。可以用来做全局变量，实现数据共享
  Vue.observable = <>(obj: T): T => {
    observe(obj)
    return obj
  }

  // 存放全局的组件、指令、过滤器的一个对象,及拥有_base属性保存Vue的构造函数
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.


  // _base属性保存Vue的构造函数
  Vue.options._base = Vue


  // builtInComponents===>KeepAlive
  // 给Vue.options.components 增加一个KeepAlive 融合KeepAlive
  extend(Vue.options.components, builtInComponents)


  initUse(Vue)  // 插件的使用
  initMixin(Vue)  // minxin 全局混合方法,可以用来提取公共方法及状态等
  initExtend(Vue)  // Vue.extend 可以通过组件的实例获取组件的构造函数
  initAssetRegisters(Vue)  // 将指令、过滤器、组件 绑定在Vue.options上
}
