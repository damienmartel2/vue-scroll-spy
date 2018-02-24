import ScrollSpy from './scroll-spy'

const Plugin = {}

Plugin.install = (Vue) => {
  if (Plugin.install.installed) return

  Vue.directive('scroll-spy', ScrollSpy)
}

if (typeof window !== 'undefined' && window.Vue) {
  Plugin.install(window.Vue)
}

export default Plugin
