/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 1.如果安装过这个插件直接跳出
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 2.获取参数并在参数中增加Vue的构造函数
    const args = toArray(arguments, 1)  // [vue,...]
    args.unshift(this)  // 在参数中增加构造函数
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)  // 执行并把vue传进入，保持插件中的vue和外面使用的vue一致
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 4.记录安装的插件
    installedPlugins.push(plugin)
    return this
  }
}
