import SpyCore from './scroll-spy-core'
import SpyObserver from './scroll-spy-observer'
import _ from 'lodash'

export default {
  links: [],
  scrollTo: true,
  activeClass: 'active',

  init: (el, binding) => {
    SpyCore.links = []
    SpyCore.initLinks(el, binding)
    SpyCore.initObserver(el, binding)
  },

  initLinks: (el, binding) => {
    let links = el.querySelectorAll('a')
    for (var i = 0; i < links.length; i++) {
      SpyCore.links.push({
        element: links[i],
        target: links[i].hash
      })
    }
    if (binding.activeClass) {
      SpyCore.activeClass = binding.activeClass
    }
  },

  initObserver (el, binding) {
    SpyObserver.init(SpyCore.changeHash)
    let links = SpyCore.links
    for (var i = 0; i < links.length; i++) {
      let targetElement = document.querySelector('[id="' + links[i].target + '"]')
      let observer = new IntersectionObserver(SpyObserver.intersectionCallback, SpyObserver.observerOptions)
      SpyObserver.add(links[i].target, observer)
      observer.observe(targetElement)
    }
  },

  initHashListener: (el, binding) => {
    window.addEventListener('hashchange', (event) => {
      SpyCore.onHash(el, binding, event)
    })
  },

  removeHashListener: (el, binding) => {
    window.removeEventListener('hashchange', (event) => {
      SpyCore.onHash(el, binding, event)
    })
  },

  onHash: (el, binding, event) => {
    SpyCore.activateCurrentHash(SpyCore.scrollTo)
    SpyCore.scrollTo = true
  },

  changeHash (target) {
    if( location.hash !== target) {
      SpyCore.scrollTo = false
      if(window.location.hash) {
        window.location.hash = target
      } else if (window.history.pushState) {
        window.history.pushState('', '', target)
      }
    }
  },

  activateCurrentHash (scrollTo) {
    let parts = window.location.hash.split('#')
    let link = _.find(SpyCore.links, (item) => {
      return item.target.replace('#', '') === parts[parts.length - 1]
    })
    if(!link) {
      link = SpyCore.links[0]
      scrollTo = false
    }
    if (scrollTo) {
      SpyCore.activateTarget(link)
    } else {
      SpyCore.activateLink(link)
    }
  },

  activateLink (link) {
    let links = SpyCore.links
    for (var i = 0; i < links.length; i++) {
      links[i].element.classList.remove(SpyCore.activeClass)
    }
    link.element.classList.add(SpyCore.activeClass)
  },

  activateTarget (link) {
    SpyCore.activateLink(link)
    let target = document.querySelector('[id="' + link.target + '"]')
    if (target) {
      target.scrollIntoView(true)
    }
  }
}
