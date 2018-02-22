# vue-scroll-spy
Directive that manage link active class and hash in url on scrolling to anchor

## Usage
```js
import VueScrollSpy from '../dist/vue-scroll-spy'
Vue.use(VueScrollSpy);
```
```html
<ul v-scroll-spy="{ activeClass: 'active' }">
  <li><a href="#section-1">Section 1</a></li>
  <li><a href="#section-2">Section 2</a></li>
  <li><a href="#section-3">Section 3</a></li>
  <li><a href="#section-4">Section 4</a></li>
</ul>

<div class="main">
  <div id="#section-1">
      <h1>Section 1</h1>
  </div>
  <div id="#section-2">
      <h1>Section 2</h1>
  </div>
  <div id="#section-3">
      <h1>Section 3</h1>
  </div>
  <div id="#section-4">
    <h1>Section 4</h1>
  </div>
</div>
```
