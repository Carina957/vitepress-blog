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

      if (!hasPermission)
        el.parentNode && el.parentNode.removeChild(el)
    }
  }
  else {
    throw new Error(`Need roles! Like: v-permission="['admin, 'editor]"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
```

## Waves

```js
import './waves.css'

export const waves = {
  beforeMount(el, binding) {
    el.addEventListener(
      'click',
      e => {
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
              ripple.style.top =
                rect.height / 2 - ripple.offsetHeight / 2 + 'px'
              ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
              break
            default:
              ripple.style.top =
                (e.pageY -
                  rect.top -
                  ripple.offsetHeight / 2 -
                  document.documentElement.scrollTop ||
                  document.body.scrollTop) + 'px'
              ripple.style.left =
                (e.pageX -
                  rect.left -
                  ripple.offsetWidth / 2 -
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft) + 'px'
          }
          ripple.style.backgroundColor = opts.color
          ripple.className = 'waves-ripple z-active'
          return false
        }
      },
      false
    )
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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transform: scale(0);
  -ms-transform: scale(0);
  transform: scale(0);
  opacity: 1;
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

## Use

### Vue2

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
