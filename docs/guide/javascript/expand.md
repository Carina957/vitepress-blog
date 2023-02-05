---
outline: deep
---

# 拓展

## 清空数组

1. arr.length = 0
2. arr = []
3. arr.splice(0, arr.length)

建议第二种，因为 `arr` 被重新赋值后，如果之前的数组没有被引用，则会被 `JavaScript` 垃圾回收机制回收。

## forEach

`forEach` 原则上是不能修改原数组的，但是因为 `JavaScript` 本身的原因。如果数组的某一项是引用类型， `forEach` 是可以修改原数组的

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

## 冻结对象

### Object.freeze()

可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。该方法返回被冻结的对象。

### Object.freeze() 存在的意义

如果你有一个巨大的数组或 `Object` ，并且确信数据不会修改，使用 `Object.freeze()` 可以让性能大幅提升。在我的实际开发中，这种提升大约有5~10倍，倍数随着数据量递增,对于纯展示的大数据，都可以使用 `Object.freeze()` 提升性能。
