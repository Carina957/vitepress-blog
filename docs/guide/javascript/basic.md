---
outline: deep
---

# 基础

## 清空数组

1. arr.length = 0
2. arr = []
3. arr.splice(0, arr.length)

建议第二种，因为 `arr` 被重新赋值后，如果之前的数组没有被引用，则会被 `JavaScript` 垃圾回收机制回收。

## forEach

`forEach` 原则上是不能修改原数组的，但是因为 `JavaScript` 本身的原因。如果数组的某一项是引用类型， `forEach` 是可以˜修改原数组的

```js
const arr = [
  1,
  'mike',
  {
    name: 'jack'
  }
]

arr.forEach(item => {
  item.name = 'alva'
})

console.log(arr) // [1, 'mike', { name: 'alva' }]
```
