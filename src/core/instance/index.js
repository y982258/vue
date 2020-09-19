import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue的核心构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)  // _init()
stateMixin(Vue)  // $set(),$watch(),$watch()
eventsMixin(Vue)  // $on,$emit,$off,$once
lifecycleMixin(Vue) // ._update 虚拟dom转成正式dom
renderMixin(Vue)  // _render $nextTick

export default Vue
