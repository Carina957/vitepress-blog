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
