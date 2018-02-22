import scrollSpyObserverUtil from './scroll-spy-observer'
import scrollSpyUtil from './scroll-spy-util'
import _ from 'lodash'

export default {
  observers: {},
  reports: [],

  observerOptions: {
    root: null,
    rootMargin: '0px',
    threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
  },

  init: () => {
    _.forIn(scrollSpyObserverUtil.observers, (value, key) => {
      scrollSpyObserverUtil.observers[key].disconnect()
    })
    scrollSpyObserverUtil.observers = {}
    scrollSpyObserverUtil.reports = []
  },

  intersectionCallback (entries) {
    for (var i = 0; i < entries.length; i++) { 
      let index = _.findIndex(scrollSpyObserverUtil.reports, (item) => {
        return item.target === entries[i].target.id
      })
      scrollSpyObserverUtil.reports[index].ratio = entries[i].intersectionRatio
    }
    let bestContent = scrollSpyObserverUtil.getBestContent()

    if (bestContent) {
      scrollSpyUtil.changeHash(bestContent.target)
    }
  },

  getBestContent () {
    let lastItem = scrollSpyObserverUtil.reports[scrollSpyObserverUtil.reports.length - 1]
    let visibleContents = _.filter(scrollSpyObserverUtil.reports, (item) => {
      return item.ratio > 0
    })
    let bestContent = null
    let bestRatio = -1

    for (var i = 0; i < visibleContents.length; i++) { 
      let isLastItem = lastItem.target === visibleContents[i].target
      let isBest = false
      if (isLastItem && visibleContents[i].ratio === 1) {
        isBest = true
      } else if (visibleContents[i].ratio > bestRatio) {
        isBest = true
      }
      if (isBest) {
        bestContent = visibleContents[i]
        bestRatio = visibleContents[i].ratio
      }
    }
    return bestContent
  },

  contains (target) {
    if (target !== '') {
      let inArray = (this.observers[target] !== undefined)
      return inArray
    }
    return false
  },

  add (target, observer) {
    if (target !== '') {
      this.observers[target] = observer
      this.reports.push({
        target: target,
        ratio: 0
      })
    }
  },

  get (target) {
    if (target !== '') {
      if (this.contains(target)) {
        return this.observers[target]
      }
    }
    return
  }
}
