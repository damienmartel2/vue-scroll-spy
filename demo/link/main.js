import Vue from 'vue'
import ScrollSpy from '../../src'
import demo from './demo.vue'

Vue.use(ScrollSpy)

new Vue({
  el: '#app',
  render: h => h(demo)
})
