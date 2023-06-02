---
outline: deep
---

# Directives

## Permission

```js
import store from '@/store'

export function checkPermission(el, binding) {
  const { value } = binding
  const roles = store.getters && store.getters.roles

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => permissionRoles.includes(role))

      if (!hasPermission) el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error(`Need roles! Like: v-permission="['admin, 'editor]"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  },
}
```

## Waves

```js
import './waves.css'

const context = '@@wavesContext'

function handleClick(el, binding) {
  function handle(e) {
    const customOpts = Object.assign({}, binding.value)
    const opts = Object.assign(
      {
        ele: el, // 波纹作用元素
        type: 'hit', // hit 点击位置扩散 center中心点扩展
        color: 'rgba(0, 0, 0, 0.15)', // 波纹颜色
      },
      customOpts
    )
    const target = opts.ele

    if (target) {
      target.style.position = 'relative'
      target.style.overflow = 'hidden'
      const rect = target.getBoundingClientRect()
      let ripple = target.querySelector('.waves-ripple')

      if (!ripple) {
        ripple = document.createElement('span')
        ripple.className = 'waves-ripple'
        ripple.style.height = ripple.style.width =
          Math.max(rect.width, rect.height) + 'px'
        target.appendChild(ripple)
      } else {
        ripple.className = 'waves-ripple'
      }

      switch (opts.type) {
        case 'center':
          ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
          ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
          break
        default:
          ripple.style.top =
            (e.pageY -
              rect.top -
              ripple.offsetHeight / 2 -
              document.documentElement.scrollTop || document.body.scrollTop) +
            'px'
          ripple.style.left =
            (e.pageX -
              rect.left -
              ripple.offsetWidth / 2 -
              document.documentElement.scrollLeft || document.body.scrollLeft) +
            'px'
      }

      ripple.style.backgroundColor = opts.color
      ripple.className = 'waves-ripple z-active'
      return false
    }
  }

  if (!el[context]) el[context] = { removeHandle: handle }
  else el[context].removeHandle = handle

  return handle
}

export const waves = {
  // vue3's wording
  // beforeMount(el, binding) {
  //   el.addEventListener('click', handleClick(el, binding), false)
  // },

  // vue2's wording
  bind(el, binding) {
    el.addEventListener('click', handleClick(el, binding), false)
  },
  update(el, binding) {
    el.removeEventListener('click', handleClick(el, binding), false)
  },
  unbind(el, binding) {
    el.addEventListener('click', handleClick(el, binding), false)
    el[context] = null
    delete el[context]
  },
}
```

```css
.waves-ripple {
  position: absolute;
  border-radius: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  background-clip: padding-box;
  pointer-events: none;
  opacity: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
}

.waves-ripple.z-active {
  opacity: 0;
  -webkit-transform: scale(2);
  -ms-transform: scale(2);
  transform: scale(2);
  -webkit-transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, -webkit-transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, transform 0.6s ease-out;
  transition: opacity 1.2s ease-out, transform 0.6s ease-out,
    -webkit-transform 0.6s ease-out;
}
```

## el-drag-dialog

`Element ui` 's Dialog drag.

```js
export default {
  bind(el, binding, vnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null)
    const getStyle = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

      // 获取到的值带px 正则匹配替换
      let styL = getStyle(dragDom, 'left')
      let styT = getStyle(dragDom, 'top')

      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`

        // emit onDrag event
        vnode.child.$emit('dragDialog')
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
}
```

## Clipboard

```js
// Inspired by https://github.com/Inndy/vue-clipboard2
const Clipboard = require('clipboard')

if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}

export default {
  bind(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      const clipboard = new Clipboard(el, {
        text() {
          return binding.value
        },
        action() {
          return binding.arg === 'cut' ? 'cut' : 'copy'
        },
      })
      clipboard.on('success', e => {
        const callback = el._v_clipboard_success
        callback && callback(e) // eslint-disable-line
      })
      clipboard.on('error', e => {
        const callback = el._v_clipboard_error
        callback && callback(e) // eslint-disable-line
      })
      el._v_clipboard = clipboard
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._v_clipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._v_clipboard_error = binding.value
    } else {
      el._v_clipboard.text = function () {
        return binding.value
      }
      el._v_clipboard.action = function () {
        return binding.arg === 'cut' ? 'cut' : 'copy'
      }
    }
  },
  unbind(el, binding) {
    if (binding.arg === 'success') {
      delete el._v_clipboard_success
    } else if (binding.arg === 'error') {
      delete el._v_clipboard_error
    } else {
      el._v_clipboard.destroy()
      delete el._v_clipboard
    }
  },
}
```

## Usage

### vue2.1

```js
export * from './waves'
export * from './permission'
```

```js
import * as directives from './directives'

Object.keys(directives).forEach(directive =>
  Vue.directive(key, directives[key])
)
```

### vue2.2

```js
import waves from './waves'

const install = function (Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install) // eslint-disable-line
}

waves.install = install
export default waves
```

## mousewheel

[normalize-wheel](https://www.npmjs.com/package/normalize-wheel)

```sh
$ npm i normalize-wheel
```

```js
import normalizeWheel from 'normalize-wheel'

const isFirefox =
  typeof navigator !== 'undefined' &&
  navigator.userAgent.toLowerCase().indexOf('firefox') > -1

const mousewheel = function (element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(
      isFirefox ? 'DOMMouseScroll' : 'mousewheel',
      function (event) {
        const normalized = normalizeWheel(event)
        callback && callback.apply(this, [event, normalized])
      }
    )
  }
}

export default {
  bind(el, binding) {
    mousewheel(el, binding.value)
  },
}
```
