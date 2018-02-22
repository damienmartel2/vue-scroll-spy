import scrollSpyUtil from './scroll-spy-util'
import scrollSpyObserverUtil from './scroll-spy-observer'
import _ from 'lodash'

export default {
  links: [],
  scrollTo: true,
  activeClass: 'active',

  init: (el, binding) => {
    scrollSpyUtil.links = []
    scrollSpyUtil.initLinks(el, binding)
    scrollSpyUtil.initObserver(el, binding)
  },

  initLinks: (el, binding) => {
    let links = el.querySelectorAll('a')
    for (var i = 0; i < links.length; i++) {
      scrollSpyUtil.links.push({
        element: links[i],
        target: links[i].hash
      })
    }
    if (binding.activeClass) {
      scrollSpyUtil.activeClass = binding.activeClass
    }
  },

  initObserver (el, binding) {
    let links = scrollSpyUtil.links
    for (var i = 0; i < links.length; i++) {
      let targetElement = document.querySelector('[id="' + links[i].target + '"]')
      let observer = new IntersectionObserver(scrollSpyObserverUtil.intersectionCallback, scrollSpyObserverUtil.observerOptions)
      scrollSpyObserverUtil.add(links[i].target, observer)
      observer.observe(targetElement)
    }
  },

  initHashListener: (el, binding) => {
    window.addEventListener('hashchange', (event) => {
      scrollSpyUtil.onHash(el, binding, event)
    })
  },

  removeHashListener: (el, binding) => {
    window.removeEventListener('hashchange', (event) => {
      scrollSpyUtil.onHash(el, binding, event)
    })
  },

  onHash: (el, binding, event) => {
    scrollSpyUtil.activateCurrentHash(scrollSpyUtil.scrollTo)
    scrollSpyUtil.scrollTo = true
  },

  changeHash (target) {
    if( location.hash !== target) {
      scrollSpyUtil.scrollTo = false
      if(window.location.hash) {
        window.location.hash = target
      } else if (window.history.pushState) {
        window.history.pushState('', '', target)
      }
    }
  },

  activateCurrentHash (scrollTo) {
    let parts = window.location.hash.split('#')
    let link = _.find(scrollSpyUtil.links, (item) => {
      return item.target.replace('#', '') === parts[parts.length - 1]
    })
    if(!link) {
      link = scrollSpyUtil.links[0]
      scrollTo = false
    }
    if (scrollTo) {
      scrollSpyUtil.activateTarget(link)
    } else {
      scrollSpyUtil.activateLink(link)
    }
  },

  activateLink (link) {
    let links = scrollSpyUtil.links
    for (var i = 0; i < links.length; i++) {
      links[i].element.classList.remove(scrollSpyUtil.activeClass)
    }
    link.element.classList.add(scrollSpyUtil.activeClass)
  },

  activateTarget (link) {
    scrollSpyUtil.activateLink(link)
    let target = document.querySelector('[id="' + link.target + '"]')
    if (target) {
      target.scrollIntoView(true)
    }
  }
}
