---
outline: deep
---

# 拓展

## JSX

JSX 是一种 JavaScript 的语法拓展

一个简单的 JSX ：

```jsx
const element = (
  <div>
    <h1>Hi there 👋</h1>
    <h2>Good to see you here.</h2>
  </div>
)
```

### 优点

- JXS 执行更快，因为它在编译成 JavaScript 代码后进行了优化。

  `Babel` 会把 JSX 转译为一个名为 `React.createElement()` 函数调用。
  以下两种示例代码完全等效:

  ```jsx
  const element = (
    <div>
      <h1 className="greeting">Hi there 👋</h1>
    </div>
  )

  const elementR = React.createElement(
    'h1',
    {
      className: 'greeting',
    },
    'Hi there 👋',
  )
  ```

  `React.createElement()` 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象:

  ```jsx
  // ! 注意这是简化后的结构
  const element = {
    type: 'h1',
    props: {
      className: 'greeting',
      children: 'Hi there 👋',
    },
  }
  ```

  如果有变量的话：

  ```jsx
  ReactDOM.render(
    <div>
      <h1>{1 + 1}</h1>
    </div>,
    document.getElementById('examle')
  )
  ```

- JSX 是类型安全的，因为它在编译过程中就能发现错误。
- 使用 JSX 编写模版更简单快速。
