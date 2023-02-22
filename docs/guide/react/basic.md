---
outline: deep
---

# 基础

- **声明式设计** − React 采用声明范式，可以轻松描述应用。
- **高效** − React 通过对 DOM 的模拟，最大限度地减少与 DOM 的交互。
- **灵活** − React 可以与已知的库或框架很好地配合。
- **JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
- **组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
- **单向响应的数据流** − React 实现了单向响应的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

## 组件

react 中的组件分为两大类，一类是函数式组件，一类是类组件。在 hooks 出现之前，react 中的函数组件通常只考虑负责 UI 的渲染，没有自身的状态、没有业务逻辑代码，是一个纯函数。

> 注意：组件的名字必须以大写字母开头。
> React 会将以小写字母开头的组件视为原生 DOM 标签。例如：
> `<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 Welcome。

### 函数式组件

```js
function Welcome (props) {
  return <h1>Hi, {props.name}</h1>
}

ReactDOM.render(
  <Welcome name="Chi's" />,
  document.getElementById('app')
)
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 `props` (代表属性)对象与并返回一个 React 元素。 `props` 是所有属性的集合，属性类似于函数中的参数。
这类组件被称为 `函数组件` ，因为它本质上就是 JavaScript 函数。

### 类组件

```jsx
class Welcome extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return <h1>Hi, there 👋 {this.props.name}</h1>
  }
}

ReactDOM.render(
  <Welcome name="Chi's" />,
  document.getElementById('app')
)
```

### props

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props 这一点其实类似于 vue 中组件的属性，我们知道组件的属性是由父组件传入的，如果想更新这个数据必须要在父组件中重新传递数据，达到数据的更新，不能组件擅自修改属性。

### super 关键字

super 代表父类的构造函数，用来创建父类的 this 对象，结果返回子类实例对象。

### Fragments

React 中的一个常见模式是一个组件返回多个元素。`Fragments` 允许你将子列表分组，而无需向 DOM 添加额外节点。

```jsx
render () {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
    {/* <React.Fragment></React.Fragment> 等价于 <></> */}
  )
}
```

## Hooks

`Hook` 是 `React 16.8` 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

### Hooks 规则

`Hook` 本质就是 `JavaScript` 函数，但是在使用它时需要遵循两条规则。官方提供了一个 [linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks) 来强制执行。

#### 只在最顶层使用 Hook

**不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 `useState` 和 `useEffect` 调用之间保持 hook 状态的正确。

#### 只在 React 函数中调用 Hook

**不要在普通的 JavaScript 函数中调用 Hook。** 你可以：

- [x] 在 React 的函数组件中调用 Hook
- [x] 在自定义 Hook 中调用其他 Hook (我们将会在下一页 中学习这个。)

遵循此规则，确保组件的状态逻辑在代码中清晰可见。

### useEffect

Effect Hook 可以让你在函数组件中执行副作用操作

```jsx
import React, { useState, useEffect } from 'react'

function Example () {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times.`
  })

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
    </div>
  )
}
```

:::tip
useEffect Hook 看做 `componentDidMount` ，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。
:::

如果你的 `effect` 返回一个函数，React 将会在执行清除操作时调用它

```jsx
import React, { useState, useEffect } from 'react'

function FriendStatus (props) {
  const [isOnline, setIsOnline] = useState(null)

  useEffect(() => {
    function handleStatusChange (status) {
      setIsOnline(status.isOnline)
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)

    return function cleanup () {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
    }
  })

  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}
```

:::tip
并不是必须为 `effect` 中返回的函数命名。这里我们将其命名为 `cleanup` 是为了表明此函数的目的，但其实也可以返回一个箭头函数或者给起一个别的名字。
:::

### Install VitePress

Add VitePress and Vue as dev dependencies for the project.

::: code-group

$ npm install -D vitepress vue
$ yarn add -D vitepress vue
$ pnpm add -D vitepress vue
:::

::: details Getting missing peer deps warnings?
@docsearch/js has certain issues with its peer dependencies. If you see some commands failing due to them, you can try this workaround for now:

If using PNPM, add this in your package.json:

"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search"
    ]
  }
}
:::
