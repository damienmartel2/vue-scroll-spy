import scrollSpyUtil from './scroll-spy-util'
import scrollSpyObserverUtil from './scroll-spy-observer'

export default {
  inserted: (el, binding, vnode, oldVnode) => {
    scrollSpyUtil.init(el, binding)
    scrollSpyUtil.initHashListener(el, binding)
    scrollSpyUtil.activateCurrentHash(true)
  },
  unbind: (el, binding, vnode, oldVnode) => {
    scrollSpyUtil.removeHashListener(el, binding)
  }
}
