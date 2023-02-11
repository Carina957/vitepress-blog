---
outline: deep
---

# 面经

## 原型原型链

在 `javascript` 中，函数可以有属性。每个函数都有一个特殊的属性叫作原型（ `prototype` ），正如下面所展示的。

```js
function doSomething () {
  console.log('doSomething')
}

console.log(doSomething.prototype)
```

正如上面所看到的， `doSomething` 函数有一个默认的原型属性，它在控制台上面呈现了出来。运行这段代码之后，控制台上面应该出现了像这样的一个对象。

```text
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

```text
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
const doSomeInstancing = new doSomething()
doSomeInstancuing.prop = 'some value'
```

结果：

```text
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

## 总结

- new关键字做了哪几件事
  1. 创建一个空对象 `let obj = {}`
  2. 改变 `this` 指向 (`bind` 、 `call` 、 `apply`)
  3. 添加属性
  4. 返回这个对象 `return obj`
- 构造函数/对象模板：专门用来反复创建相同结构对象的专门方法。
- 继承：使用现有类型，创建出新的类型，新类型可以使用现有类型的属性和方法，也可以
拓展出现有类型没有的属性和方法。
- 原型链：一个对象的隐式指向创建该对象的构造函数的原型对象，以此形成的链叫原型
链。
- 原型链的作用：用来实现继承的。
- 隐式原型： `__proto__` 任何对象都有隐式原型，并且一个对象的隐式原型指向创建该对象的构造函数的原型对象。
- `constructor`: 每个实例对象都从原型中继承了一个 `constructor` 属性，该属性指向了用于构造此实例对象的构造函数。
- 每个实例对象（`object`）都有一个私有属性（称之为 `__proto__` ）指向它的构造函数的原型对象（ `prototype` ）。该原型对象也有一个自己的原型对象（ `__proto__` ），层层向上直到一个对象的原型对象为 `null` 。根据定义， `null` 没有原型，并作为这个原型链中的最后一个环节。

## 参考

- [MDN](https://developer.mozilla.org/zh-CN/)
