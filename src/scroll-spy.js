import SpyCore from './scroll-spy-core'

export default {
  inserted: (el, binding, vnode, oldVnode) => {
    SpyCore.init(el, binding)
    SpyCore.initHashListener(el, binding)
    SpyCore.activateCurrentHash(true)
  },
  unbind: (el, binding, vnode, oldVnode) => {
    SpyCore.removeHashListener(el, binding)
  }
}
