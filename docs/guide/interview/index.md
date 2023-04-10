---
outline: deep
---

# 面经

## 原型原型链

在 `javascript` 中，函数可以有属性。每个函数都有一个特殊的属性叫作原型（ `prototype` ），正如下面所展示的。

```js
function doSomething() {
  console.log('doSomething')
}

console.log(doSomething.prototype)
```

正如上面所看到的， `doSomething` 函数有一个默认的原型属性，它在控制台上面呈现了出来。运行这段代码之后，控制台上面应该出现了像这样的一个对象。

```js
{
  constructor: ƒ doSomething(),
  __proto__: {
    constructor: ƒ Object(),
    hasOwnProperty: ƒ hasOwnProperty(),
    isPrototypeOf: ƒ isPrototypeOf(),
    propertyIsEnumerable: ƒ propertyIsEnumerable(),
    toLocaleString: ƒ toLocaleString(),
    toString: ƒ toString(),
    valueOf: ƒ valueOf()
  }
}
```

我们可以添加一些属性到 doSomething 的原型上面，如下所示。

```js
doSomething.prototype.foo = 'bar'
```

结果：

```js
{
  foo: 'bar'
  constructor: ƒ doSomething(),
  __proto__: {
    constructor: ƒ Object(),
    hasOwnProperty: ƒ hasOwnProperty(),
    isPrototypeOf: ƒ isPrototypeOf(),
    propertyIsEnumerable: ƒ propertyIsEnumerable(),
    toLocaleString: ƒ toLocaleString(),
    toString: ƒ toString(),
    valueOf: ƒ valueOf()
  }
}
```

然后，我们可以使用 `new` 运算符来在现在的这个原型基础之上，创建一个 `doSomething` 的实例。正确使用 `new` 运算符的方法就是在正常调用函数时，在函数名的前面加上一个 `new` 前缀。通过这种方法，在调用函数前加一个 `new` ，它就会返回一个这个函数的实例化对象。然后，就可以在这个对象上面添加一些属性。

```js
const doSomeInstancing = new DoSomething()

doSomeInstancuing.prop = 'some value'
```

结果：

```js
{
  prop: "some value",
  __proto__: {
    foo: "bar",
    constructor: ƒ doSomething(),
    __proto__: {
      constructor: ƒ Object(),
      hasOwnProperty: ƒ hasOwnProperty(),
      isPrototypeOf: ƒ isPrototypeOf(),
      propertyIsEnumerable: ƒ propertyIsEnumerable(),
      toLocaleString: ƒ toLocaleString(),
      toString: ƒ toString(),
      valueOf: ƒ valueOf()
    }
  }
}
```

当你访问 `doSomeInstancing` 的一个属性，浏览器首先查找 `doSomeInstancing` 是否有这个属性。如果 `doSomeInstancing` 没有这个属性，然后浏览器就会在 `doSomeInstancing` 的 `__proto__` 中查找这个属性 (也就是 `doSomething.prototype`). 如果 `doSomeInstancing` 的 `__proto__` 有这个属性，那么 `doSomeInstancing` 的 `__proto__` 上的这个属性就会被使用。否则，如果 `doSomeInstancing` 的 `__proto__` 没有这个属性，浏览器就会去查找 `doSomeInstancing` 的 `__proto__` 的 `__proto__` ，看它是否有这个属性。默认情况下，所有函数的原型属性的 `__proto__` 就是 `window.Object.prototype`. 所以 `doSomeInstancing` 的 `__proto__` 的 `__proto__` (也就是 `doSomething.prototype` 的 `__proto__` (也就是 Object.prototype)) 会被查找是否有这个属性。如果没有在它里面找到这个属性，然后就会在 `doSomeInstancing` 的 `__proto__` 的 `__proto__` 的 `__proto__` `里面查找。然而这有一个问题：doSomeInstancing` 的 `__proto__` 的 `__proto__` 的 `__proto__` 不存在。最后，原型链上面的所有的 `__proto__` 都被找完了，浏览器所有已经声明了的 `__proto__` 上都不存在这个属性，然后就得出结论，这个属性是 `undefined`.

### 总结

- new 关键字做了哪几件事
  1. 创建一个空对象 `let obj = {}`
  2. 改变 `this` 指向 (`bind` 、 `call` 、 `apply`)
  3. 添加属性
  4. 返回这个对象 `return obj`
- 构造函数/对象模板：专门用来反复创建相同结构对象的专门方法。
- 继承：使用现有类型，创建出新的类型，新类型可以使用现有类型的属性和方法，也可以拓展出现有类型没有的属性和方法。
- 原型链：一个对象的隐式指向创建该对象的构造函数的原型对象，以此形成的链叫原型链。
- 原型链的作用：用来实现继承的。
- 隐式原型： `__proto__` 任何对象都有隐式原型，并且一个对象的隐式原型指向创建该对象的构造函数的原型对象。
- `constructor`: 每个实例对象都从原型中继承了一个 `constructor` 属性，该属性指向了用于构造此实例对象的构造函数。
- 每个实例对象（`object`）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（ `prototype` ）。该原型对象也有一个自己的原型对象（ `__proto__` ），层层向上直到一个对象的原型对象为 `null` 。根据定义， `null` 没有原型，并作为这个原型链中的最后一个环节。

### 参考

- [MDN](https://developer.mozilla.org/zh-CN/)

## vue2 和 vue3 的区别

### vue2 和 vue3 双向数据绑定原理发生了改变

- vue2 的双向数据绑定是利用了 es5 的一个 `API Object.definepropert()` 对数据进行劫持结合发布订阅模式来实现的。
- vue3 中使用了 es6 的 `proxy API` 对数据进行处理。相比与 vue2 ，使用 `proxy API` 优势有：
  1. defineProperty 只能监听某个属性，不能对全对象进行监听；可以省去 for in 、闭包等内容来提升效率（直接绑定整个对象即可）；
  2. 可以监听数组，不用再去单独的对数组做特异性操作，vue3 可以检测到数组内部数据的变化。

### vue3 支持碎片(Fragments)

### Composition API

vue2 与 vue3 最大的区别是 vue2 使用选项类型 api ，对比 vue3 合成型 api 。旧得选项型 api 在代码里分割了不同得属性： `data` 、 `computed` 、 `methods` 等；新得合成型 api 能让我们使用方法来分割，相比于旧的 api 使用属性来分组，这样代码会更加简便和整洁。

### 建立数据 data

vue2 是把数据放入 data 中，vue3 就需要使用一个新的 `setup()` 方法，此方法在组件初始化构造得时候触发。使用一下三个步骤来简=建立反应性数据：

1. 从 vue 引入 `reactive` ；
2. 使用 `reactive()` 方法来声明数据为响应性数据；
3. 使用 `setup()` 方法来返回我们得响应性数据，从而 `template` 可以获取这些响应性数据。

### 生命周期

| vue2            | vue3            |
| :-------------- | :-------------- |
| beforeCreate    | setup()         |
| Created         | setup()         |
| beforeMount     | onBeforeMount   |
| mounted         | onMounted       |
| beforeUpdate    | onBeforeUpdate  |
| updated         | onUpdated       |
| beforeDestroyed | onBeforeUnmount |
| destroyed       | onUnmounted     |
| activated       | onActivated     |
| deactivated     | onDeactivated   |

### 父子传参不同， `setup()` 函数特性

1. `setup()` 函数接收两个参数：`props` 、 `context` (包含 `attrs` 、 `slots` 、 `emit` )
2. `setup` 函数是处于生命周期 `beforeCreated` 和 `created` 俩个钩子函数之前
3. 执行 `setup` 时，组件实例尚未被创建（在 `setup()` 内部， `this` 不会是该活跃实例得引用，即不指向 vue 实例，vue 为了避免我们错误得使用，直接将 `setup` 函数中得 `this` 修改成了 `undefined` ）
4. 与模板一起使用时，需要返回一个对象
5. 因为 `setup` 函数中， `props` 是响应式得，当传入新的 `prop` 时，它将会被更新，所以不能使用 es6 解构，因为它会消除 `prop` 得响应性，如需解构 `prop`，可以通过使用 `setup` 函数中得 `toRefs` 来完成此操作。
6. 父传子，用 `props` ,子传父用事件 `Emitting Events` 。在 vue2 中，会调用 `this.$emit` 然后传入事件名和对象；在 vue3 中得 `setup()` 中得第二个参数 `content` 对象中就有 `emit` ，那么我们只要在 `setup()` 接收第二个参数中使用分解对象法取出 `emit` 就可以在 `setup` 方法中随意使用了。
7. 在 `setup()` 内使用响应式数据时，需要通过 `.value` 获取
8. 从 `setup()` 中返回得对象上得 `property` 返回并可以在模板中被访问时，它将自动展开为内部值。不需要在模板中追加 `.value` 。
9. `setup` 函数只能是同步的不能是异步的。

## `Proxy` 原理(vue3)

`Proxy` 可以理解成， `在目标对象之前架设一层 "拦截"` ，当外界对该对象访问的时候，都必须经过这层拦截，而 `Proxy` 就充当了这种机制，类似于代理的含义，它可以 `对外界访问对象之前进行过滤和改写该对象` 。

### `Proxy` 基本语法

```js
// 被代理之后返回的对象 = new Proxy(被代理对象，要代理对象的操作)
const obj = new Proxy(target, handler)
```

1. get(target, propKey, receiver)
2. set(target, propKey, value, receiver)
3. has(target, propKey)
4. construct(target, args)
5. apply(target, object, args)

### `Proxy` 实现数据监听

```js
// 创建响应式
function reactive(target = {}) {
  if (typeof target !== 'object' || target === 'null') return target // 不是对象或数组直接返回

  // 代理配置
  const proxyConf = {
    get(target, key, receiver) {
      // 只处理本身（非原型）的属性
      const ownKeys = Reflect.ownKeys(target)
      ownKeys.includes(key) && console.log(/get/, key) // 监听

      const result = Reflect.get(target, key, receiver) // 返回不做处理

      // 递归调用，这里所做的优化是只在调用到对象深层次的属性时才会触发递归。
      return reactive(result)
    },
    set(target, key, val, receiver) {
      // 重复的数据，不处理
      if (val === target[key]) return true

      const ownKeys = Reflect.ownKeys(target)

      if (ownKeys.includes(key)) console.log(/set 已有属性/, key) // 监听
      else console.log(/新增的属性/, key)

      const result = Reflect.set(target, key, val, receiver)

      console.log(/set/, key, val)

      return result // 是否设置成功
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)

      console.log(/deleteProperty/, key)
      return result
    },
  }

  // 生成代理对象
  const observed = new Proxy(target, proxyConf)

  return observed
}

// 测试数据
const data = {
  name: 'Jack',
  age: 24,
  info: {
    city: 'hangzhou',
    a: {
      b: {
        c: {
          d: 1,
        },
      },
    },
  },
}
```

`Object.definePropety` 的深度监听是一次性就全部监听的，而 `proxy` 的深度监听是在 `get` 的时候才去递归的，是一个惰性的，很慢的过程，这就是 `proxy` 性能的优化。

### `Proxy` 优缺点

- 规避了 `Object.definedProperty` 的问题
- `proxy` 无法兼容所有浏览器，无法进行 `polyfill`

> `polyfill` ( `polyfiller` )，指的是一个代码块。这个代码块向开发者提供了一种技术， 这种技术可以让浏览器提供原生支持，抹平不同浏览器对 `API` 兼容性的差异。

## `Object.defineProperty` 的缺点

1. 深度监听需要一次性递归 (遍历每个对象的每个属性，如果对象嵌套很深的话，需要使用递归调用。)
2. 无法监听新增属性/删除属性(Vue.set Vue.delete，未在 data 中定义的属性会报 undefined)
3. 无法原生监听数组，需要特殊处理

因此 `vue3` 中之后就改用 `Proxy` 来更好的解决如上面的问题，为 `data` 对象代理 `get` 、 `set` 、 `deleteProperty` 三个方法。

## Reflect 对象

`Reflect` 对象原型就是 `Object`

1. 将 `object` 对象的一些明显属性语言内部的方法（如 `Object.defineProperty` ）放到 `Reflect` 对象上，就能从 `Reflect` 对象上拿到语言内部的方法。
2. 在使用对象的 `Object.defineProperty(obj, name, {})` 时，如果出现异常的话，会抛出一个错误，需要使用 `try catch` 去捕获，但是使用 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false`。

Reflect 有 13 个属性，这里我们只用到前 4 个：

1. **`Reflect.get`(目标对象，属性名，上下文对象) - 读取对象属性**
2. **`Reflect.set`(目标属性，属性名，属性值，上下文对象）- 设置对象属性**
3. **`Reflect.deleteProperty`(目标对象，属性名）- 删除对象属性**
4. **`Reflect.ownKeys`(目标对象）- 返回由目标对象自身的属性（只处理本身-非原型的属性）组成的数组**
5. `Reflect.apply`(目标函数，调用目标函数时绑定的 `this` 对象，参数列表) – 通过指定的参数列表调用目标函数
6. `Reflect.has`(目标对象，属性名) – 检测对象上是否有此属性
7. `Reflect.constructor`(被运行的目标函数,参数数组，生成的实列对象是谁的实列）（如果没有最后一个参数，默认生成的实列对象就和 `target` 构造函数是一样的）
8. `Reflect.definedPrototype`(目标对象，属性名，描述符) – 定义对象属性，返回一个逻辑值
9. `Reflect.isExtensible`(目标对象) – 用于检查一个对象是否可扩展（添加新属性或方法）
10. `Reflect.preventExtensions`(目标对象) – 阻止新属性添加到目标对象中
11. `Reflect.getOwnPropertyDescriptor`(目标对象，属性）- 返回对象中的属性描述符
12. `Reflect.getPrototypeOf`(目标对象) – 返回一个对象原型
