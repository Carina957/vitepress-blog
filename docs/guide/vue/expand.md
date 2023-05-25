# 拓展

## 组件的通信

### 派发与广播 —— 自行实现 `dispatch` 和 `broadcast` 方法

`emitter.js` 源码：

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name

    if (name === componentName) child.$emit.apply(...[eventName].concat(params))
    else broadcast.apply(child, [componentName, eventName].concat([params]))
  })
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root
      let name = parent.$options.name

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent

        if (parent) name = parent.$options.name
      }
      if (parent) parent.$emit.apply(...[eventName].concat(params))
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params)
    },
  },
}
```

### 找到任意组件实例 —— `findComponents` 系列方法

它并非 `Vue.js` 内置，而是需要自行实现，以工具函数的形式来使用，它是一系列的函数，可以说是组件通信的终极方案。findComponents 系列方法最终都是返回组件的实例，进而可以读取或调用该组件的数据和方法。

它适用于以下场景：

- 由一个组件，向上找到最近的指定组件；
- 由一个组件，向上找到所有的指定组件；
- 由一个组件，向下找到最近的指定组件；
- 由一个组件，向下找到所有指定的组件；
- 由一个组件，找到指定组件的兄弟组件。

5 个不同的场景，对应 5 个不同的函数，实现原理也大同小异。

具体实现：

5 个函数的原理，都是通过递归、遍历，找到指定组件的 name 选项匹配的组件实例并返回。

> 完整源码地址：<https://github.com/icarusion/vue-component-book>

#### 向上找到最近的指定组件——findComponentUpward

先看代码：

```js
// 由一个组件，向上找到最近的指定组件
function findComponentUpward(context, componentName) {
  let parent = context.$parent
  let name = parent.$options.name

  while (parent && (!name || ![componentName].includes(name))) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }

  return parent
}
export { findComponentUpward }
```

`findComponentUpward` 接收两个参数，第一个是当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 `this` ，第二个参数是要找的组件的 `name` 。

`findComponentUpward` 方法会在 `while` 语句里不断向上覆盖当前的 `parent` 对象，通过判断组件（即 `parent` ）的 name 与传入的 `componentName` 是否一致，直到直到最近的一个组件为止。

与 `dispatch` 不同的是， `findComponentUpward` 是直接拿到组件的实例，而非通过事件通知组件。比如下面的示例，有组件 A 和组件 B，A 是 B 的父组件，在 B 中获取和调用 A 中的数据和方法：

```vue
<!-- component-a.vue -->
<script>
import componentB from './component-b.vue'

export default {
  name: 'ComponentA',
  components: { ComponentB: componentB },
  data() {
    return {
      name: 'Aresn',
    }
  },
  methods: {
    sayHello() {
      console.log('Hello, Vue.js')
    },
  },
}
</script>

<template>
  <div>
    组件 A
    <ComponentB />
  </div>
</template>
```

```vue
<!-- component-b.vue -->
<script>
import { findComponentUpward } from '../utils/assist.js'

export default {
  name: 'ComponentB',
  mounted() {
    const comA = findComponentUpward(this, 'componentA')

    if (comA) {
      console.log(comA.name) // Aresn
      comA.sayHello() // Hello, Vue.js
    }
  },
}
</script>

<template>
  <div>组件 B</div>
</template>
```

使用起来很简单，只要在需要的地方调用 `findComponentUpward` 方法就行，第一个参数一般都是传入 `this` ，即当前组件的上下文（实例）。

上例的 `comA` ，保险起见，加了一层 if (`comA`) 来判断是否找到了组件 A，如果没有指定的组件而调用的话，是会报错的。

`findComponentUpward` 只会找到最近的一个组件实例，如果要找到全部符合要求的组件，就需要用到下面的这个方法。

#### 向上找到所有的指定组件——findComponentsUpward

代码如下：

```js
// 由一个组件，向上找到所有的指定组件
function findComponentsUpward(context, componentName) {
  const parents = []
  const parent = context.$parent

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent)

    return parents.concat(findComponentsUpward(parent, componentName))
  } else {
    return []
  }
}
export { findComponentsUpward }
```

`findComponentsUpward` 的使用场景较少，一般只用在递归组件里面（后面小节会介绍），因为这个函数是一直向上寻找父级（`parent`）的，只有递归组件的父级才是自身。事实上，`iView` 在使用这个方法也都是用在递归组件的场景，比如菜单组件 Menu。由于递归组件在 Vue.js 组件里面并不常用，那自然 `findComponentsUpward` 也不常用了。

#### 向下找到最近的指定组件——findComponentDownward

代码如下：

```js
// 由一个组件，向下找到最近的指定组件
function findComponentDownward(context, componentName) {
  const childrens = context.$children
  let children = null

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name

      if (name === componentName) {
        children = child
        break
      } else {
        children = findComponentDownward(child, componentName)
        if (children) break
      }
    }
  }
  return children
}
export { findComponentDownward }
```

#### 向下找到所有指定的组件——findComponentsDownward

```js
// 由一个组件，向下找到所有指定的组件
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child)
    const foundChilds = findComponentsDownward(child, componentName)

    return components.concat(foundChilds)
  }, [])
}
export { findComponentsDownward }
```

#### 找到指定组件的兄弟组件——findBrothersComponents

```js
// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents(context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter(
    item => item.$options.name === componentName
  )
  const index = res.findIndex(item => item._uid === context._uid)

  if (exceptMe) res.splice(index, 1)

  return res
}

export { findBrothersComponents }
```

## vue/cli Prettier.config.js

```js
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  htmlWhitespaceSensitivity: 'ignore', // ignore css
  vueIndentScriptAndStyle: false,
  endOfLine: 'lf',
  bracketSameLine: false,
}
```

## 参考

- [Vue.js 组件精讲](https://juejin.cn/book/6844733759942557704)
