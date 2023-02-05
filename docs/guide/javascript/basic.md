---
outline: deep
---

# 基础

## 基本数据类型

- Number 数字
- String 字符串
- Boolean 布尔值
- Null 空值
- Undefined 未定义
- Object 对象

### null 和 undefined 的区别

---

#### 相同点

1. 都是原始类型的值，且保存在栈中
2. 进行条件判断时，两者都是 false

    ```js
    // true ECMAScript 认为 `undefined` 是 `null` 派生出来的，所以定义他们值是相同的
    console.log(undefined == null)
    ```

#### 不同点

1. null 是 js 的关键字，表示空值；undefined 不是 js 的关键字，它是一个全局变量，表示未定义。
2. null 是 Object 的一个特殊值，如果一个 Object 为 null，表示这个对象不是有效对象，null 是一个不存在的对象的占位符；undefined 是 Global 的一个属性。
3. 类型不一样：

    ```js
    typeof(null) // object
    typeof(undefined) // undefined
    ```

4. 转换的值不一样：

    ```js
    console.log(Number(undefined)) // NaN
    console.log(Number(11 + undefined)) // NaN

    console.log(Number(null)) // 0
    console.log(Number(11 + null)) // 11
    ```

#### 产生方式

---

##### null

1. 当访问一个不存的 DOM 节点时

    ```js
    console.log(document.getElementById("#app")) //null
    ```

2. Object 的原型链终点

    ```js
    console.log(Object.prototype.__proto__) // null
    ```

> 当需要释放一个对象的时候可以将该对象赋值为 null ，进而来释放对象。

##### undefined

1. 声明了变量但未赋值

    ```js
    let name
    console.log(name) // undefined
    ```

2. 对象的属性没有赋值的情况下

    ```js
    let obj = { name: 'alva' }
    console.log(obj.age) // undefined
    ```

3. 函数调用的时候，函数的参数没有提供的情况下

4. 当函数没有返回值的情况下

    ```js
    function handleChange (value) {
      console.log(value) // undefined
    }

    console.log(handleChange()) // undefined
    ```
